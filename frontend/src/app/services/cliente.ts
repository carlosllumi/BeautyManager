
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cliente {
  id_cliente: number;
  nombre: string;
  telefono: string;
  id_usuario?: number | null;
}

export interface ClienteNuevo {
  nombre: string;
  telefono: string;
  id_usuario: number | null;
}

export interface Usuario {
  id_usuario: number;
  nombre: string;
  correo: string;
}

export interface Usuario {
  id_usuario: number;
  nombre: string;
  correo: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/clientes';
  private usuariosApiUrl = 'http://localhost:3000/api/usuarios/clientes';

  listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  listarUsuariosClientes(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.usuariosApiUrl);
  }

  listarUsuarios(): Observable<Usuario[]> {
  return this.http.get<Usuario[]>(
    'http://localhost:3000/api/usuarios/clientes'
  );
}

  crearCliente(cliente: ClienteNuevo): Observable<unknown> {
    return this.http.post(this.apiUrl, cliente);
  }

  actualizarCliente(
    id: number,
    cliente: ClienteNuevo
  ): Observable<unknown> {
    return this.http.put(`${this.apiUrl}/${id}`, cliente);
  }

  eliminarCliente(id: number): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
