<template>
    <div id="app">
        <nav  class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">ACME</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">                            
                            <router-link class="nav-link" aria-current="page" to="/">Roles</router-link>
                        </li>
                        <li class="nav-item">                            
                            <router-link class="nav-link" to="/vehicles">Vehiculos</router-link>
                        </li>
                        <li class="nav-item">                            
                            <router-link class="nav-link" to="/users">Usuarios</router-link>
                        </li>                        
                    </ul>                    
                </div>
            </div>
        </nav>        
        <router-view/>
    </div>
</template>