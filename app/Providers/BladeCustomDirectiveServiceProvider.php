<?php

namespace App\Providers;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class BladeCustomDirectiveServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        Blade::directive('role', function ($role) {
            return "<?php if(auth()->check() && auth()->user()->hasRole({$role})) { ?>";
        });

        Blade::directive('endrole', function ($role) {
            return "<?php } ?>";
        });

        // Modified Lang Blade Directive
        Blade::directive('lang', function ($args) {
            @eval("\$args = [$args];");
            $args = explode('|', $args[0]);
            if (count($args) == 2) {
                $key     = $args[0];
                $var     = explode(':', $args[1])[0];
                $message = explode(':', $args[1])[1];
                return "<?php echo trans('{$key}', ['{$var}'=>trans('{$message}')]); ?>";
            } else {
                return "<?php echo trans('$args[0]'); ?>";
            }
        });

        /**
         * Set variable in blade
         * {? $old_section = "whatever" ?}
         */
        Blade::extend(function ($value) {
            return preg_replace('/\{\?(.+)\?\}/', '<?php ${1} ?>', $value);
        });

    }
}
