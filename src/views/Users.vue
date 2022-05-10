<template>
    <div class="users container mt-5">
        <div class="card">
            <div class="card-header text-center">
                <h3>Usuarios</h3>
            </div>
            <div class="float-left mt-2 mb-2">
                <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Crear Usuario</button>                
            </div>
            <div class="card-body">
                <table class="table table striped table-hover table-responsive">
                    <thead>
                        <tr>
                            <th>Primer Nombre</th>
                            <th>Segundo Nombre</th>
                            <th>Apellidos</th>
                            <th>Documento</th>
                            <th>Dirección</th>
                            <th>Telefono</th>
                            <th>Ciudad</th>
                            <th>Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, key) in users" :key="key">
                            <td>{{user.first_name}}</td>
                            <td>{{user.second_name}}</td>
                            <td>{{user.lastname}}</td>
                            <td>{{user.document}}</td>
                            <td>{{user.address}}</td>
                            <td>{{user.phone}}</td>
                            <td>{{user.city}}</td>
                            <td>{{user.rol.rol}}</td>
                            <td>
                                <button class="btn btn-outline-success" v-on:click="editUser(user)">Editar</button>                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{id === null ? 'Creación de Vehiculo':'Actualización de Vehiculo'}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="plate">Primer Nombre</label>
                            <input type="text" v-model="user.first_name" name="plate" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="color">Segundo Nombre</label>
                            <input type="text" v-model="user.second_name" name="color" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="brand">Apellidos</label>
                            <input type="text" v-model="user.lastname" name="brand" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="brand">Documento</label>
                            <input type="number" v-model="user.document" name="brand" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="brand">Dirección</label>
                            <input type="text" v-model="user.address" name="brand" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="brand">Telefono</label>
                            <input type="number" v-model="user.phone" name="brand" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="brand">Ciudad</label>
                            <input type="text" v-model="user.city" name="brand" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="type">Rol</label>    
                            <multiselect v-model="rol_selected" :multiple="false" :options="roles" label="rol" track-by="rol"></multiselect>
                        </div>

                        <div class="form-group">
                            <label for="type">Vehiculos</label>    
                            <multiselect v-model="user.vehicles" :multiple="true" :options="vehicles" label="plate" track-by="plate"></multiselect>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" v-on:click="saveUser()">Guardar Cambios</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { Modal } from 'bootstrap'
export default {
    name: 'UsersView',
    components:{
        Multiselect
    },
    data(){
        return{
            backendUrl: process.env.VUE_APP_BACKEND_URL,
            users:[],
            user:{},
            roles:[],
            vehicles:[],
            rol_selected:{},
            id:null, 
            modal:null
        }
    },
    mounted(){        
        this.modal = new Modal(document.getElementById('exampleModal'))
        this.getUsers();
        this.getRoles();
        this.getVehicles();
    },
    methods:{
        getRoles(){
            this.$axios.get(`${this.backendUrl}/roles`).then((response)=>{
                this.roles = response.data.data;
            });
        },
        getVehicles(){
            this.$axios.get(`${this.backendUrl}/vehicles`).then((response)=>{                
                this.vehicles = response.data.data;
            });
        },
        getUsers(){
            this.$axios.get(`${this.backendUrl}/user`).then((response)=>{                
                this.users = response.data.data;
            });
        },
        editUser(data){
            this.user = data;
            this.id = data.id;
            this.modal.show();
        },
        saveUser(){
            this.user.id_rol = this.rol_selected.id
            if(this.id === null){
                this.$axios.post(`${this.backendUrl}/user`, this.user).then((response)=>{
                    this.$toastr.s(response.data.message);
                    this.cleanData();
                }).catch((error)=>{
                    this.$toastr.e('Intenta de Nuevo mas Tarde');
                    console.log(error)
                })
            }else{
                this.$axios.put(`${this.backendUrl}/user/${this.id}`, this.user).then((response)=>{
                    this.$toastr.s(response.data.message);
                    this.cleanData();
                })
            }
        },        
        cleanData(){
            this.getUsers();
            this.user = {};
            this.id = null;
        }
    },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>