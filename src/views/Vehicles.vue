<template>
    <div class="vehicles container mt-5">
        <div class="card">
            <div class="card-header text-center">
                <h3>Vehiculos</h3>
            </div>
            <div class="float-left mt-2 mb-2">
                <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Crear Vehiculo</button>
                <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modalReport">Informe</button>
            </div>
            <div class="card-body">
                <table class="table table striped table-hover table-responsive">
                    <thead>
                        <tr>
                            <th>Placa</th>
                            <th>Marca</th>
                            <th>Color</th>
                            <th>Tipo</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(vehicle, key) in vehicles" :key="key">
                            <td>{{vehicle.plate}}</td>
                            <td>{{vehicle.brand}}</td>
                            <td>{{vehicle.color}}</td>
                            <td>{{vehicle.type}}</td>
                            <td>
                                <button class="btn btn-outline-success" v-on:click="editVehicle(vehicle)">Editar</button>
                                <button class="btn btn-outline-danger" v-on:click="deleteVehicle(vehicle.id)">Eliminar</button>
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
                            <label for="plate">Placa</label>
                            <input type="text" v-model="vehicle.plate" name="plate" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="color">Color</label>
                            <input type="text" v-model="vehicle.color" name="color" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="brand">Marca</label>
                            <input type="text" v-model="vehicle.brand" name="brand" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="type">Tipo</label>                            
                            <select name="type" class="form-control" v-model="vehicle.type">
                                <option value="Publico">Publico</option>
                                <option value="Privado">Privado</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" v-on:click="saveVehicle()">Guardar Cambios</button>
                    </div>
                </div>
            </div>
        </div>


        <div class="modal fade" id="modalReport" tabindex="-1" aria-labelledby="modalReportLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalReportLabel">Reporte de Vehiculos</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-striped table-hover table-responsive">
                            <thead>
                                <tr>
                                    <td>Placa</td>
                                    <td>Marca</td>
                                    <td>Propietario</td>
                                    <td>Conductor</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(vehicle, key) in vehicles" :key="key">
                                    <td>{{vehicle.plate}}</td>
                                    <td>{{vehicle.brand}}</td>
                                    <td v-if="vehicle.users && vehicle.users.length > 0">            
                                        <div v-for="(user, key) in vehicle.users" :key="key">
                                            <p v-if="user.id_rol === 1">{{user.first_name+' '+user.second_name+' '+user.lastname}}</p>
                                        </div>
                                    </td>
                                    <td v-if="vehicle.users && vehicle.users.length > 0">            
                                        <div v-for="(user, key) in vehicle.users" :key="key">                                            
                                            <p v-if="user.id_rol === 2">{{user.first_name+' '+user.second_name+' '+user.lastname}}</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" v-on:click="saveVehicle()">Guardar Cambios</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Modal } from 'bootstrap'
export default {
    name: 'VehiclesView',
    data(){
        return{
            backendUrl: process.env.VUE_APP_BACKEND_URL,
            vehicles:[],
            vehicle:{},
            id:null, 
            modal:null
        }
    },

    mounted(){        
        this.modal = new Modal(document.getElementById('exampleModal'))
        this.getVehicles();
    },
    methods:{
        getVehicles(){
            this.$axios.get(`${this.backendUrl}/vehicles`).then((response)=>{                
                this.vehicles = response.data.data;
            });
        },
        editVehicle(data){
            this.vehicle = data;
            this.id = data.id;
            this.modal.show();
        },
        saveVehicle(){
            if(this.id === null){
                this.$axios.post(`${this.backendUrl}/vehicles`, this.vehicle).then((response)=>{
                    this.$toastr.s(response.data.message);
                    this.cleanData();
                }).catch((error)=>{
                    this.$toastr.e('Intenta de Nuevo mas Tarde');
                    console.log(error)
                })
            }else{
                this.$axios.put(`${this.backendUrl}/vehicles/${this.id}`, this.vehicle).then((response)=>{
                    this.$toastr.s(response.data.message);
                    this.cleanData();
                })
            }
        },
        deleteVehicle(id){
            if(window.confirm('¿Seguro desea Eliminar este dato?')){
                this.$axios.delete(`${this.backendUrl}/vehicles/${id}`).then((response)=>{
                    this.$toastr.s(response.data.message);
                    this.getVehicles();
                }).catch((error)=>{
                    this.$toastr.e('Intenta de Nuevo mas Tarde');
                    console.log(error)
                })
            }             
        },
        cleanData(){
            this.getVehicles();
            this.vehicle = {};
            this.id = null;
        }
    },
}
</script>
