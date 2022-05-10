<template>
    <div class="roles container mt-5">
        <div class="card">
            <div class="card-header text-center">
                <h3>Roles</h3>
            </div>
            <div class="float-left mt-2 mb-2">
                <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Crear Rol</button>
            </div>
            <div class="card-body">
                <table class="table table striped table-hover table-responsive">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(rol, key) in roles" :key="key">
                            <td>{{rol.rol}}</td>
                            <td>
                                <button class="btn btn-outline-success" v-on:click="editRoles(rol)">Editar</button>
                                <button class="btn btn-outline-danger" v-on:click="deleteRol(rol.id)">Eliminar</button>
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
                        <h5 class="modal-title" id="exampleModalLabel">{{id === null ? 'Creación de Rol':'Actualización de Rol'}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="name">Rol</label>
                            <input type="text" v-model="rol.rol" name="name" class="form-control">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" v-on:click="saveRol()">Guardar Cambios</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Modal } from 'bootstrap'
export default {
    name: 'RolesView',
    data(){
        return{
            backendUrl: process.env.VUE_APP_BACKEND_URL,
            roles:[],
            rol:{},
            id:null, 
            modal:null
        }
    },
    mounted(){        
        this.modal = new Modal(document.getElementById('exampleModal'))
        this.getRoles();
    },
    methods:{
        getRoles(){
            this.$axios.get(`${this.backendUrl}/roles`).then((response)=>{
                this.roles = response.data.data;
            });
        },
        editRoles(data){
            this.rol = data;
            this.id = data.id;
            this.modal.show();
        },
        saveRol(){
            if(this.id === null){
                this.$axios.post(`${this.backendUrl}/roles`, this.rol).then((response)=>{
                    this.$toastr.s(response.data.message);                    
                    this.cleanData();
                }).catch((error)=>{
                    this.$toastr.e('Intenta de Nuevo mas Tarde');
                    console.log(error)
                })
            }else{
                this.$axios.put(`${this.backendUrl}/roles/${this.id}`, this.rol).then((response)=>{
                    this.$toastr.s(response.data.message);                    
                    this.cleanData();
                })
            }
        },
        deleteRol(id){
            if(window.confirm('¿Seguro desea Eliminar este dato?')){
                this.$axios.delete(`${this.backendUrl}/roles/${id}`).then((response)=>{
                    this.$toastr.s(response.data.message);
                    this.getRoles();
                }).catch((error)=>{
                    this.$toastr.e('Intenta de Nuevo mas Tarde');
                    console.log(error)
                })
            }             
        },
        cleanData(){
            this.getRoles();
            this.rol = {};
            this.id = null;
        }
    },
}
</script>
