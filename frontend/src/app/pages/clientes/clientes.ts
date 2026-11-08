
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  ClienteService,
  Cliente,
  ClienteNuevo,
  Usuario
} from '../../services/cliente';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.scss'
})
export class Clientes implements OnInit {

  private clienteService = inject(ClienteService);

  clientes: Cliente[] = [];
  usuarios: Usuario[] = [];

  mensaje = '';
  error = '';

  

  nuevoCliente: ClienteNuevo = {
    nombre: '',
    telefono: '',
    id_usuario: null
  };

  ngOnInit(): void {
    this.cargarClientes();
    this.cargarUsuarios();
  }

  cargarClientes(): void {
    this.clienteService.listarClientes().subscribe({
      next: (datos) => {
        this.clientes = datos;
      },
      error: () => {
        this.error = 'Error al cargar clientes';
      }
    });
  }

  cargarUsuarios(): void {
    this.clienteService.listarUsuariosClientes().subscribe({
      next: (datos) => {
        this.usuarios = datos;
      },
      error: () => {
        this.error = 'Error al cargar los usuarios';
      }
    });
  }

  guardarCliente(): void {
    this.mensaje = '';
    this.error = '';

    if (this.nuevoCliente.id_usuario === null) {
      this.error = 'Debes seleccionar un usuario';
      return;
    }

    this.clienteService.crearCliente(this.nuevoCliente)
      .subscribe({
        next: () => {
          this.mensaje = 'Cliente registrado correctamente';

          this.nuevoCliente = {
            nombre: '',
            telefono: '',
            id_usuario: null
          };

          this.cargarClientes();
        },
        error: (err) => {
          this.error = err.error?.mensaje ||
            'Error al registrar cliente';
        }
      });
  }
}
