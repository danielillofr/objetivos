import { TipoUsuario } from './usuario.interface';
import { TipoIncidencia } from './incidencia.interface';
import { TipoLog } from './log.interface';




export interface TipoObjetivo {
  usuario: String,
  _id: String,
  nombre: String,
  fechaInicio: Date,
  fechaFin: Date,
  conseguido: Number,
  diasLaborables: Number,
  diasProyecto: Number,
  estado: String,
  comEvaluacion: String
}

export interface TipoRespuestaObjetivo {
  ok: boolean,
  errBaseDatos?: boolean,
  err?: string,
  objetivo?: TipoObjetivo
}

export interface TipoDatosUsuario {
  usuario: TipoUsuario,
  objetivos: TipoObjetivo[],
  incidencias: TipoIncidencia[],
  datos:{
    totales:{
      dias: Number,
      porcentaje: Number
    },
    proyecto:{
      dias: Number,
      porcentaje: Number,
      vsTotal: Number
    },
    incidencias:{
      dias: Number,
      porcentaje: Number,
      vsTotal: Number
    },
    fechaPlan: String,
    porcentajeConseguido: Number
  }
}

export interface TipoRespuestaDatosUsuario {
  ok: Boolean,
  errBaseDatos?: Boolean,
  err?: Boolean,
  datos?: TipoDatosUsuario
}

export interface TipoObjetivoCompleto {
  objetivo: TipoObjetivo,
  incidencias: TipoIncidencia[],
  logs: TipoLog[]
}

export interface TipoRespuestaObjetivoCompleto {
  ok: boolean,
  errBaseDatos?: boolean,
  err?: string,
  objetivoCompleto?: TipoObjetivoCompleto
}

// usuario: {
//   type: Schema.Types.ObjectId,
//   ref: 'Usuario',
//   required: [true, 'El usuario es requerido']
// },
// nombre: {
//   type: String,
//   require: [true, 'El nombre es requerido']
// },
// fechaInicio: {
//   type: Date,
//   require: [true, 'El nombre es requerido']
// },
// fechaFin: {
//   type: Date,
//   require: [true, 'El nombre es requerido']
// },
// conseguido: {
//   type: Number,
//   default: 0
// },
// diasLaborables: {
//   type: Number,
//   default: 0
// },
// porcentaje: {
//   type: Number,
//   default: 0
// }
