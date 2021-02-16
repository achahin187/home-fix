<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Invoice;
use Exception;
use Illuminate\Http\Request;
use PayPal\Api\Payment;
use PayPal\Auth\OAuthTokenCredential;
use PayPal\Exception\PayPalConnectionException;
use PayPal\Rest\ApiContext;

class PaymentController extends Controller
{
    protected $apiContext;

    public function __construct()
    {
        parent::__construct();
        $this->apiContext = new ApiContext(
            new OAuthTokenCredential(
                env('PAYPAL_CLIENT_ID'),
                env('PAYPAL_SECRET')
            )
        );
    }

    public function verifyPayment(Request $request)
    {
        $x = <<<EOF
{
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://homefix.test/api/paymentresponse?success=true",
        "cancel_url": "http://homefix.test/api/cancelpayment"
    },
    "transactions": [
        {
            "amount": {
                "currency": "USD",
                "total": "20",
                "details": {
                    "shipping": "1.20",
                    "tax": "1.30",
                    "subtotal": "17.50"
                }
            },
            "item_list": {
                "items": [
                    {
                        "name": "Ground Coffee 40 oz",
                        "currency": "USD",
                        "quantity": 1,
                        "sku": "123123",
                        "price": "7.50"
                    },
                    {
                        "name": "Granola bars",
                        "currency": "USD",
                        "quantity": 5,
                        "sku": "321321",
                        "price": "2"
                    }
                ]
            },
            "description": "Payment description",
            "invoice_number": "5d0797375c6a2"
        }
    ]
EOF;

        try {
            $paymentId      = 'PAYID-LUDUW5A2WB55537Y54375108';
            $payment_client = json_decode($x, true);

            // Gettin payment details by making call to paypal rest api
            $payment = Payment::get($paymentId, $this->apiContext);

            // Verifying the state approved
            if ($payment->getState() !== 'approved') {
                return __error(
                    'Payment has not been verified. Status is: ' .
                    $payment->getState(), 200);
            }

            // Amount on client side
            $amount_client = $payment_client["amount"];

            // Currency on client side
            $currency_client = $payment_client["currency_code"];

            // Paypal transactions
            $transaction = $payment->getTransactions()[0];
            // Amount on server side
            $amount_server = $transaction->getAmount()->getTotal();
            // Currency on server side
            $currency_server = $transaction->getAmount()->getCurrency();
            $sale_state      = $transaction->getRelatedResources()[0]
                ->getSale()->getState();

            // Storing the payment in payments table
            $invoice = new Invoice([
                'transaction_id' => $payment->getId(),
                'created_at'     => $payment->getCreateTime(),
                'updated_at'     => $payment->getUpdateTime(),
                'state'          => $payment->getState(),
                'amount'         => $amount_server,
                'currency'       => $currency_server
            ]);
            // storing the saled items
            $invoice->save();

            // Verifying the amount
            if ($amount_server !== $amount_client) {
                return __error('Payment amount doesn\'t matched.', 200);
            }

            // Verifying the currency
            if ($currency_server !== $currency_client) {
                return __error('Payment currency doesn\'t matched.', 200);
            }

            // Verifying the sale state
            if ($sale_state !== 'completed') {
                return __error('Sale not completed.', 200);
            }

            return __success('Payment verified successfully', 200);
        } catch (PayPalConnectionException $exc) {
            if ($exc->getCode() === 404) {
                return __error('Payment not found!', 200);
            } else {
                return __error('Unknown error occurred!', 200);
            }
        } catch (Exception $exc) {
            return __error('Unknown error occurred!', 200);
        }
    }
}
