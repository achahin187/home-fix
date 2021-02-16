<?php

namespace App\Console\Commands;

use App\Offer;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class OffersCleanUp extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'offers:cleanup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Deactivate Ended Offers!';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
       $offers = Offer::where('end_at','<=',\Carbon\Carbon::now())->get();
        
        if($offers){
            foreach($offers as $offer){
                $offer->update(["status"=>0]);
            }
        }
        
 /*       try {
            DB::table('offers')->whereRaw(
                'UNIX_TIMESTAMP(end_at) - UNIX_TIMESTAMP(CURRENT_TIMESTAMP) <= 0'
            )->update(['status' => false]);
        } catch (\Exception $e) {
            //
        }*/
        
    }
}
