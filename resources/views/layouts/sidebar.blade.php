<div class="main-menu menu-fixed menu-dark menu-accordion menu-shadow expanded" data-scroll-to-active="true">
    <div class="main-menu-content">
        <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
            @role('super-admin')
            <li class="nav-item has-sub"><a href="{{ route('users.index') }}">
                    <i class="la la-user"></i>
                    <span class="menu-title">@lang('admin.user_management')</span></a>
                <ul class="menu-content" style="">
                    <li class=""><a class="menu-item" href="{{ route('users.index') }}">
                            @lang('admin.user_list')</a>
                    </li>
                    <li class=""><a class="menu-item" href="{{ route('users.create') }}">
                            @lang('admin.add_user')</a>
                    </li>
                </ul>
            </li>
            @endrole
            @role('super-admin|admin')
            <li class="nav-item has-sub"><a href="{{ route('clients.index') }}"><i class="la la-user"></i>
                    <span class="menu-title">@lang('admin.client_management')</span></a>
                <ul class="menu-content" style="">
                    <li class=""><a class="menu-item" href="{{ route('clients.index') }}">
                            @lang('admin.client_list')</a>
                    </li>
                    <li class=""><a class="menu-item" href="{{ route('clients.create') }}">
                            @lang('admin.add_client')</a>
                    </li>
                </ul>
            </li>
            <li class="nav-item has-sub"><a href="{{ route('workers.index') }}">
                    <i class="la la-user"></i>
                    <span class="menu-title">@lang('admin.worker_management')</span></a>
                <ul class="menu-content" style="">
                    <li class=""><a class="menu-item" href="{{ route('workers.index') }}">
                            @lang('admin.worker_list')</a>
                    </li>
                    <li class=""><a class="menu-item" href="{{ route('workers.create') }}">
                            @lang('admin.add_worker')</a>
                    </li>
                </ul>
            </li>
            @endrole
            @role('super-admin|admin')
            <li class="nav-item has-sub"><a href="{{ route('categories.index') }}">
                    <i class="ft-list"></i>
                    <span class="menu-title">@lang('admin.category_management')</span></a>
                <ul class="menu-content" style="">
                    <li class=""><a class="menu-item" href="{{ route('categories.index') }}">
                            @lang('admin.category_list')</a>
                    </li>
                    <li class=""><a class="menu-item" href="{{ route('categories.create') }}">
                            @lang('admin.add_category')</a>
                    </li>
                </ul>
            </li>
            <li class="nav-item has-sub"><a href="{{ route('services.index') }}">
                    <i class="ft-settings"></i>
                    <span class="menu-title">@lang('admin.service_management')</span></a>
                <ul class="menu-content" style="">
                    <li class=""><a class="menu-item" href="{{ route('services.index') }}">
                            @lang('admin.service_list')</a>
                    </li>
                    <li class=""><a class="menu-item" href="{{ route('services.create') }}">
                            @lang('admin.add_service')</a>
                    </li>
                </ul>
            </li>
            <li class="nav-item has-sub"><a href="{{ route('offers.index') }}">
                    <i class="la la-gift"></i>
                    <span class="menu-title">@lang('admin.offer_management')</span></a>
                <ul class="menu-content" style="">
                    <li class=""><a class="menu-item" href="{{ route('offers.index') }}">
                            @lang('admin.offer_list')</a>
                    </li>
                    <li class=""><a class="menu-item" href="{{ route('offers.create') }}">
                            @lang('admin.add_offer')</a>
                    </li>
                </ul>
            </li>
            @endrole
            @role('super-admin|admin|manager')
            <li class="nav-item has-sub"><a href="{{ route('orders.index') }}">
                    <i class="la la-money"></i>
                    <span class="menu-title">@lang('admin.order_management')</span></a>
                <ul class="menu-content" style="">
                    <li class=""><a class="menu-item" href="{{ route('orders.index') }}">
                            @lang('admin.order_management')</a>
                    </li>
                    <li class=""><a class="menu-item" href="{{ route('orders.quick') }}">
                            @lang('admin.the_quick_orders')</a>
                    </li>
                </ul>
            </li>
            <li class="nav-item">
                <a href="{{ route('reviews.index', '') }}">
                    <i class="ft-star"></i>
                    <span class="menu-title">
                        @lang('admin.review_management')
                    </span>
                </a>
            </li>
            <li class="nav-item">
                <a href="{{ route('reports.index') }}">
                    <i class="ft-bar-chart"></i>
                    <span class="menu-title">
                        @lang('admin.reports_management')
                    </span>
                </a>
            </li>
            
            @role('super-admin|admin')
            <li class="nav-item has-sub"><a href="{{ route('slider.index') }}">
                    <i class="la la-gift"></i>
                    <span class="menu-title">@lang('admin.slider')</span></a>
                <ul class="menu-content" style="">
                    <li class=""><a class="menu-item" href="{{ route('slider.index') }}">
                            @lang('admin.view_Slider')</a>
                    </li>
                    <li class=""><a class="menu-item" href="{{ route('slider.create') }}">
                            @lang('admin.add_Slider')</a>
                    </li>
                </ul>
            </li>
            @endrole
            
                        @role('super-admin|admin')
            <li class="nav-item has-sub"><a href="{{ route('partners.index') }}">
                    <i class="la la-gift"></i>
                    <span class="menu-title">@lang('admin.Partners_management')</span></a>
                <ul class="menu-content" style="">
                    <li class=""><a class="menu-item" href="{{ route('partners.index') }}">
                            @lang('admin.view_Partner')</a>
                    </li>
                    <li class=""><a class="menu-item" href="{{ route('partners.create') }}">
                            @lang('admin.add_Partners')</a>
                    </li>
                </ul>
            </li>
            @endrole
            
            
            <li class="nav-item">
                <a href="{{ route('complains.index') }}">
                    <i class="ft-message-square"></i>
                    <span class="menu-title">
                        @lang('admin.complain_management')
                    </span>
                </a>
            </li>
            <li class="nav-item">
                <a href="{{ route('chats.index') }}">
                    <i class="ft-message-circle"></i>
                    <span class="menu-title">
                        @lang('admin.chat_managment')
                    </span>
                </a>
            </li>
            <li class="nav-item">
                <a href="{{ route('contactUs.index') }}">
                    <i class="ft-message-circle"></i>
                    <span class="menu-title">
                        @lang('admin.contactus')
                    </span>
                </a>
            </li>
            @endrole
            @role('super-admin|admin')
            <li class="nav-item">
                <a href="{{ route('countries.index') }}">
                    <i class="ft-map"></i>
                    <span class="menu-title">
                        @lang('admin.country_management')
                    </span>
                </a>
            </li>
            <li class="nav-item">
                <a href="{{ route('admin.settings') }}">
                    <i class="ft-settings"></i>
                    <span class="menu-title">
                        @lang('admin.settings')
                    </span>
                </a>
            </li>
            @endrole
        </ul>
    </div>
</div>
