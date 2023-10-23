import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-admin-user-plist-unrouted',
  templateUrl: './admin-user-plist-unrouted.component.html',
  styleUrls: ['./admin-user-plist-unrouted.component.css']
})
export class AdminUserPlistUnroutedComponent implements OnInit {
  @ViewChild('modalConfirmacion') modalConfirmacion!: ElementRef;

  datos: any = [];
  first: number = 0;
  rows: number = 10;
  page: number = 0;
  orderField: string = "id";
  orderDirection: string = "asc";
  confirmacionId: number = 0;
  isModalVisible: boolean = false; // Agregamos una variable para controlar la visibilidad del modal

  constructor(private oHttpClient: HttpClient) {}

  ngOnInit() {
    this.getPage();
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.page = event.page;
    this.getPage();
  }

  doOrder(fieldOrder: string) {
    this.orderField = fieldOrder;
    if (this.orderDirection == "asc") {
      this.orderDirection = "desc";
    } else {
      this.orderDirection = "asc";
    }
    this.getPage();
  }

  mostrarModalConfirmacion(id: number) {
    console.log('mostrarModalConfirmacion se está ejecutando con id:', id);
    
    this.confirmacionId = id;
    this.isModalVisible = true;
  }
  
  borrarUsuario(id: number) {
    if (id !== 0) {
      this.oHttpClient.delete(`http://localhost:8083/user/${id}`).subscribe({
        next: () => {
          this.getPage();
          console.log('La función borrarUsuario se ha ejecutado');
          this.isModalVisible = false;
        },
        error: (error: any) => {
          console.log('La función borrarUsuario no va');
          console.error('Error al eliminar usuario:', error);
          
        }
      });
    }
  }
  
  
  
  

  ocultarModalConfirmacion() {
    this.isModalVisible = false;
  }

  getPage(): void {
    this.oHttpClient.get(`http://localhost:8083/user?size=${this.rows}&page=${this.page}&sort=${this.orderField},${this.orderDirection}`).subscribe({
      next: (data: any) => {
        this.datos = data;
      },
      error: (error: any) => {
        this.datos = null;
        console.log(error);
      }
    });
  }
}
