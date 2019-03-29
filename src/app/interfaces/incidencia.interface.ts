export interface TipoIncidencia {
  _id: String,
  objetivo: String,
  usuario: String,
  dias: Number,
  motivo: String,
  ausencia: Boolean
}

export interface TipoRespuestaIncidencia {
  ok: boolean,
  errBaseDatos?: boolean,
  err?: string,
  incidencia: TipoIncidencia
}
