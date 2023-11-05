import React from 'react'
import { Outlet } from 'react-router-dom'

function PublicMain() {
  return (
    <div>
      <div class="limiter">
                <div class="container-login100">
                    <div class="wrap-login100">
                       
                            <span class="login100-form-title p-b-26">
                                Welcome
                            </span>
                            <span class="login100-form-title p-b-48">
                                <i class="zmdi zmdi-font"></i>
                            </span>
                          <Outlet />
                     
                    </div>
                </div>
            </div>
    </div>
  )
}

export default PublicMain
