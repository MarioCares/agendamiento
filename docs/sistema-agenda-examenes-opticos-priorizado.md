# Sistema de Agenda Online para Consulta de Exámenes Ópticos

## 1. Objetivo general

Crear un sistema de agenda online que permita reducir al mínimo la coordinación manual entre la consulta y los pacientes.

El objetivo principal es que los pacientes puedan gestionar su agendamiento de manera autónoma a partir de una solicitud de exámenes previamente registrada o mediante un formulario público para pacientes externos.

El sistema debe permitir a la consulta mantener el control de la agenda, revisar solicitudes, mover reservas, bloquear horarios y gestionar confirmaciones.

---

## 2. Tipos de pacientes y caminos de ingreso

El sistema tendrá dos caminos principales de ingreso:

1. Pacientes derivados por Doc. Palma.
2. Pacientes externos.

Ambos caminos terminan en un flujo común de agendamiento y gestión administrativa.

---

# 3. Flujo: paciente derivado por Doc. Palma

En este caso la consulta recibe previamente los antecedentes del paciente y los exámenes solicitados.

## Flujo propuesto

1. La administradora busca al paciente en el sistema.
2. Si el paciente no existe, registra sus datos.
3. Se crea una nueva solicitud de exámenes.
4. Se indica que la solicitud proviene de Doc. Palma.
5. Se asocian a la solicitud los exámenes indicados en la orden.
6. El sistema genera un enlace único de agendamiento.
7. El sistema genera un texto preparado para enviar al paciente.
8. La administradora envía el texto utilizando el medio de contacto habitual.
9. El paciente abre el enlace.
10. El paciente puede revisar los exámenes asociados a su solicitud.
11. Para cada examen puede visualizar al menos:
    - nombre;
    - duración aproximada;
    - información o indicaciones relevantes, si corresponde.
12. El paciente selecciona los exámenes que desea realizar.
13. El sistema calcula automáticamente el tiempo necesario.
14. Se muestran únicamente los horarios compatibles con la duración total requerida.
15. El paciente selecciona un horario disponible.
16. Se genera la reserva.
17. La reserva queda visible en la agenda administrativa.
18. Posteriormente la administradora puede modificar, reagendar, cancelar o reorganizar la reserva.

## Ejemplo

Si una solicitud contiene:

- OCT: 20 minutos.
- Campo visual: 30 minutos.
- Paquimetría: 10 minutos.

Y el paciente selecciona los tres exámenes, el sistema debe buscar un bloque continuo de aproximadamente 60 minutos.

Los exámenes no deberían reservarse como tres citas independientes salvo que las reglas de funcionamiento de la consulta indiquen lo contrario.

---

# 4. Flujo: paciente externo

Este flujo comienza cuando un paciente que no proviene de Doc. Palma contacta directamente a la consulta.

## Flujo propuesto

1. El paciente contacta a la consulta.
2. La consulta le entrega un enlace público de ingreso.
3. El paciente abre el formulario.
4. Ingresa sus datos personales.
5. Adjunta una copia de la orden médica.
6. Se crea una solicitud de exámenes.
7. Se determinan los exámenes que corresponden.
8. El paciente recibe acceso al proceso de agendamiento.
9. Visualiza los exámenes asociados.
10. Selecciona los exámenes que realizará.
11. El sistema calcula la duración necesaria.
12. Visualiza los horarios disponibles.
13. Selecciona una hora.
14. Se genera la reserva.
15. Desde este punto el flujo continúa de la misma forma que para un paciente derivado.

---

# 5. Decisión pendiente: validación de órdenes de pacientes externos

Debe definirse si un paciente externo puede interpretar y seleccionar por sí mismo los exámenes indicados en su orden.

Existen dos alternativas.

## Alternativa A: agendamiento inmediato

El paciente:

1. carga sus datos;
2. carga su orden;
3. selecciona los exámenes;
4. agenda inmediatamente.

### Ventajas

- Menor intervención administrativa.
- Proceso más rápido.
- Mayor nivel de automatización.

### Riesgos

- El paciente puede interpretar incorrectamente la orden.
- Puede seleccionar un examen equivocado.
- Puede reservar una duración incorrecta.

---

## Alternativa B: validación previa por la consulta

El paciente:

1. carga sus datos;
2. carga su orden;
3. envía la solicitud;
4. la consulta revisa la orden;
5. la consulta registra los exámenes correctos;
6. el paciente recibe acceso al agendamiento;
7. agenda su hora.

### Ventajas

- Menor riesgo de errores.
- La consulta mantiene control sobre la interpretación de la orden.
- La agenda se genera con una duración correcta.

### Desventajas

- Requiere intervención administrativa.
- El paciente no puede completar todo el proceso inmediatamente.

### Recomendación inicial

Para una primera versión, se recomienda considerar la validación previa cuando exista riesgo real de que los pacientes no puedan identificar correctamente los exámenes solicitados.

---

# 6. Información principal del sistema

## Paciente

Cada paciente debería poder mantener, al menos:

- nombre;
- RUT o identificador correspondiente;
- teléfono;
- correo electrónico;
- fecha de nacimiento, si fuese necesaria;
- otros datos administrativos requeridos por la consulta.

---

## Examen

Cada tipo de examen debería poder definir:

- nombre;
- duración aproximada;
- descripción;
- indicaciones para el paciente;
- estado activo o inactivo;
- precio, solamente si la consulta decide incorporarlo posteriormente.

Ejemplo:

> Campo visual — duración aproximada: 30 minutos.

---

## Solicitud de exámenes

Representa una orden o requerimiento de exámenes recibido por la consulta.

Una solicitud debería contener:

- paciente;
- origen de la solicitud;
- fecha;
- orden médica adjunta, cuando corresponda;
- exámenes solicitados;
- estado de la solicitud;
- observaciones, si fueran necesarias.

### Posibles orígenes

- Doc. Palma.
- Paciente externo.
- Otro origen futuro.

La solicitud de exámenes y la reserva deben ser conceptos distintos.

Una solicitud puede existir antes de que el paciente tenga una hora reservada.

---

## Reserva

Representa una hora asignada dentro de la agenda.

Una reserva debería contener:

- paciente;
- solicitud asociada;
- exámenes seleccionados;
- fecha;
- hora de inicio;
- hora estimada de término;
- duración total;
- estado;
- observaciones administrativas.

### Posibles estados

- Pendiente.
- Confirmada.
- Cancelada.
- Completada.
- No asistió.

Los estados definitivos deberán confirmarse con la consulta.

---

# 7. Agenda administrativa

La consulta debe contar con una agenda administrativa desde la cual pueda gestionar todas las reservas.

Idealmente debe permitir visualizar la agenda por día y/o semana.

## Acciones administrativas esperadas

- Ver reservas.
- Ver los datos básicos del paciente.
- Ver los exámenes asociados.
- Ver la duración de la reserva.
- Ver la orden médica.
- Crear una reserva manual.
- Reagendar una reserva.
- Cambiar la hora de una reserva.
- Cambiar la duración cuando sea necesario.
- Cancelar una reserva.
- Marcar una reserva como confirmada.
- Marcar una reserva como completada.
- Registrar que el paciente no asistió.
- Bloquear horarios.
- Bloquear días completos.
- Registrar excepciones de disponibilidad.
- Abrir horarios extraordinarios.

La agenda administrativa puede tener más libertad que la agenda pública.

Por ejemplo, el sistema puede impedir que un paciente reserve un horario ocupado, mientras que la administradora podría realizar ajustes manuales si conoce las condiciones reales de funcionamiento de la consulta.

---

# 8. Disponibilidad y cálculo de horarios

El sistema debe calcular qué horarios pueden ofrecerse a cada paciente.

No basta con definir un horario general de apertura.

La disponibilidad debe considerar:

- horario normal de atención;
- duración de los exámenes;
- duración total de los exámenes seleccionados;
- reservas existentes;
- bloqueos;
- horarios de colación;
- días sin atención;
- vacaciones;
- feriados, si la consulta desea administrarlos;
- horarios extraordinarios;
- posibles tiempos de preparación entre pacientes.

## Ejemplo

Agenda disponible:

- 09:00 disponible.
- 09:30 ocupado.
- 10:00 ocupado.
- 10:30 disponible.
- 11:00 disponible.
- 11:30 disponible.

Si un paciente requiere un bloque de 60 minutos, solamente deben mostrarse horarios desde los cuales existan 60 minutos continuos disponibles.

---

# 9. Recursos y simultaneidad

Debe determinarse cómo se ejecutan físicamente los exámenes.

Existen dos escenarios principales.

## Escenario simple

Una sola profesional o un único flujo de atención realiza todos los exámenes.

En este caso:

> duración de la reserva = suma de la duración de los exámenes seleccionados.

El sistema solamente debe encontrar un bloque continuo suficientemente largo.

---

## Escenario con múltiples recursos

Algunos exámenes pueden depender de diferentes profesionales, equipos o máquinas.

Por ejemplo:

- OCT → equipo OCT.
- Campo visual → campímetro.
- Otro examen → otro equipo.

En ese caso, la disponibilidad no depende solamente de una agenda general.

Cada examen podría necesitar reservar un recurso específico.

Este punto cambia considerablemente las reglas de agendamiento y debe ser aclarado antes de cerrar el alcance funcional.

---

# 10. Confirmaciones y recordatorios

El sistema debe ayudar a la consulta a confirmar las reservas antes de la fecha del examen.

Debe definirse con cuánta anticipación se realiza la confirmación.

Ejemplos:

- 48 horas antes.
- 24 horas antes.
- El mismo día.
- Combinación de varios recordatorios.

## Primera versión posible

Para el MVP se puede comenzar con una vista administrativa que muestre:

- reservas próximas;
- pacientes pendientes de confirmar;
- fecha de la reserva;
- teléfono o medio de contacto;
- estado de confirmación.

La consulta puede realizar el contacto manualmente.

## Evolución futura

Posteriormente se podría automatizar mediante:

- correo electrónico;
- WhatsApp;
- SMS.

También podría permitirse que el paciente:

- confirme asistencia;
- solicite reagendamiento;
- cancele su reserva.

Estas automatizaciones no son necesarias para la primera versión.

---

# 11. Alcance propuesto para el MVP

El MVP debe resolver el ciclo completo desde la recepción de una solicitud hasta la gestión de la reserva.

## 11.1 Acceso administrativo

- Inicio de sesión para la consulta.
- Acceso restringido al área administrativa.

---

## 11.2 Gestión de pacientes

- Listar pacientes.
- Buscar pacientes.
- Crear paciente.
- Editar datos del paciente.
- Visualizar detalle del paciente.
- Consultar sus solicitudes.
- Consultar sus reservas.

---

## 11.3 Gestión de tipos de examen

- Listar exámenes.
- Crear examen.
- Editar examen.
- Definir duración.
- Agregar descripción o indicaciones.
- Activar/desactivar examen.

---

## 11.4 Configuración de disponibilidad

- Configurar días de atención.
- Configurar horario de inicio.
- Configurar horario de término.
- Configurar pausas o colación.
- Bloquear horarios específicos.
- Bloquear días completos.
- Crear excepciones de disponibilidad.

---

## 11.5 Solicitudes provenientes de Doc. Palma

- Buscar paciente.
- Crear paciente si no existe.
- Crear solicitud.
- Seleccionar origen Doc. Palma.
- Asociar exámenes.
- Agregar observaciones.
- Generar enlace único.
- Generar texto para enviar al paciente.

---

## 11.6 Solicitudes de pacientes externos

- Disponer de un enlace público.
- Formulario de datos personales.
- Carga de orden médica.
- Crear automáticamente el paciente cuando corresponda.
- Crear solicitud.
- Marcar solicitud como pendiente de revisión cuando corresponda.
- Revisar solicitud desde administración.
- Asociar exámenes correctos.
- Habilitar al paciente para agendar.

---

## 11.7 Página pública de agendamiento

- Acceso mediante enlace válido.
- Mostrar información de la solicitud.
- Mostrar exámenes disponibles.
- Mostrar duración aproximada de cada examen.
- Permitir seleccionar exámenes.
- Calcular duración total.
- Mostrar días disponibles.
- Mostrar horarios disponibles.
- Registrar la reserva.
- Mostrar confirmación del agendamiento.

---

## 11.8 Cálculo de disponibilidad

- Considerar horario de atención.
- Considerar bloqueos.
- Considerar reservas existentes.
- Considerar duración total requerida.
- Impedir reservas superpuestas.
- Mostrar solamente horarios válidos.

---

## 11.9 Agenda administrativa

- Vista diaria.
- Vista semanal, si se considera necesaria para el MVP.
- Ver reservas.
- Abrir detalle de una reserva.
- Reagendar.
- Cancelar.
- Modificar horario.
- Crear reserva manual.
- Cambiar estado.
- Ver paciente.
- Ver exámenes.
- Ver solicitud.
- Ver orden médica.

---

## 11.10 Gestión de bloqueos

- Crear bloqueo horario.
- Crear bloqueo de día completo.
- Agregar motivo.
- Editar bloqueo.
- Eliminar bloqueo.

---

## 11.11 Estados de reserva

- Pendiente.
- Confirmada.
- Cancelada.
- Completada.
- No asistió.

Los estados finales deben validarse con la consulta.

---

## 11.12 Confirmaciones

- Listar reservas próximas.
- Identificar reservas pendientes de confirmación.
- Registrar manualmente una confirmación.
- Registrar que se contactó al paciente.
- Permitir configurar cuántos días u horas antes debe aparecer una reserva como pendiente de confirmación.

---

# 12. Backlog priorizado y ordenado por dependencias

La siguiente lista está pensada para convertirse directamente en tarjetas o issues de Kanban.

## Criterio de prioridad

- **P0 — Crítico:** necesario para completar el flujo principal del MVP.
- **P1 — Importante:** necesario para que la operación diaria sea práctica y administrable.
- **P2 — Mejora:** aporta comodidad o una mejor experiencia, pero no bloquea la validación inicial del producto.

La numeración de etapas indica el **orden recomendado de implementación según dependencias**.

---

## Etapa 1 — Acceso administrativo

Estas tareas no dependen de otros módulos y permiten construir el resto del sistema dentro de un entorno administrativo controlado.

- **P0** Crear inicio de sesión.
- **P0** Proteger el área administrativa.
- **P1** Crear estructura principal del área administrativa.
- **P2** Crear página principal o resumen administrativo.

---

## Etapa 2 — Gestión de tipos de examen

Los exámenes deben existir antes de poder asociarlos a solicitudes o calcular duraciones de reservas.

- **P0** Crear listado de tipos de examen.
- **P0** Crear tipo de examen.
- **P0** Editar tipo de examen.
- **P0** Configurar duración de examen.
- **P1** Configurar descripción.
- **P1** Configurar indicaciones para el paciente.
- **P1** Activar o desactivar examen.

---

## Etapa 3 — Gestión de pacientes

Los pacientes deben existir antes de crear solicitudes o reservas administrativas.

- **P0** Crear paciente.
- **P0** Crear listado de pacientes.
- **P0** Implementar búsqueda de pacientes.
- **P0** Editar paciente.
- **P1** Ver detalle de paciente.
- **P1** Ver solicitudes de un paciente.
- **P1** Ver reservas de un paciente.

---

## Etapa 4 — Configuración base de horarios

La agenda necesita reglas de disponibilidad antes de poder ofrecer horas a los pacientes.

- **P0** Definir días normales de atención.
- **P0** Definir hora de inicio de jornada.
- **P0** Definir hora de término de jornada.
- **P0** Definir pausas de atención.
- **P1** Crear excepción de horario.
- **P1** Crear día extraordinario de atención.

---

## Etapa 5 — Gestión de bloqueos

Los bloqueos deben formar parte del cálculo de disponibilidad antes de habilitar el agendamiento público.

- **P0** Bloquear un intervalo horario.
- **P0** Bloquear un día completo.
- **P1** Agregar motivo de bloqueo.
- **P1** Editar bloqueo.
- **P1** Eliminar bloqueo.

---

## Etapa 6 — Solicitudes provenientes de Doc. Palma

Este será el primer flujo de negocio completo que se recomienda implementar porque parte desde información controlada por la consulta.

### Creación de solicitud

- **P0** Crear solicitud para paciente existente.
- **P0** Crear paciente durante la creación de una solicitud.
- **P0** Definir origen de solicitud.
- **P0** Asociar exámenes a solicitud.
- **P0** Editar exámenes de una solicitud.
- **P1** Agregar observaciones.
- **P1** Consultar estado de la solicitud.

### Preparación del acceso del paciente

- **P0** Generar enlace único de agendamiento.
- **P1** Generar texto preparado para enviar al paciente.

---

## Etapa 7 — Motor de disponibilidad

Esta etapa es una dependencia directa del agendamiento público.

Debe completarse antes de permitir que un paciente confirme una reserva.

- **P0** Calcular disponibilidad según horario normal.
- **P0** Calcular duración total según exámenes seleccionados.
- **P0** Excluir reservas existentes.
- **P0** Excluir horarios bloqueados.
- **P0** Buscar bloques continuos suficientemente largos.
- **P0** Evitar superposición de reservas.
- **P0** Considerar pausas de atención.
- **P1** Considerar excepciones de calendario.
- **P1** Considerar días extraordinarios de atención.

---

## Etapa 8 — Agendamiento de pacientes derivados

Una vez que existen solicitudes y el motor de disponibilidad funciona, puede habilitarse el primer flujo real de autoagendamiento.

- **P0** Validar acceso mediante enlace de agendamiento.
- **P0** Mostrar información básica de la solicitud.
- **P0** Mostrar exámenes asociados.
- **P0** Mostrar duración aproximada de cada examen.
- **P0** Permitir seleccionar exámenes.
- **P0** Calcular duración total.
- **P0** Mostrar fechas disponibles.
- **P0** Mostrar horarios disponibles.
- **P0** Impedir selección de horario inválido.
- **P0** Crear reserva.
- **P1** Mostrar resumen antes de confirmar.
- **P0** Mostrar confirmación después de reservar.

Al terminar esta etapa debería ser posible completar de principio a fin el flujo de un paciente proveniente de Doc. Palma.

---

## Etapa 9 — Agenda administrativa básica

Después de permitir reservas reales, la consulta necesita herramientas para gestionarlas.

- **P0** Crear vista de agenda diaria.
- **P0** Mostrar reservas en la agenda.
- **P0** Ver detalle de reserva.
- **P0** Reagendar reserva.
- **P0** Cancelar reserva.
- **P0** Modificar hora de inicio.
- **P1** Modificar duración.
- **P0** Cambiar estado de reserva.
- **P1** Crear reserva manual.
- **P1** Acceder al paciente desde la reserva.
- **P1** Acceder a la solicitud desde la reserva.
- **P1** Visualizar orden médica desde la reserva.

---

## Etapa 10 — Flujo de pacientes externos

Este flujo reutiliza pacientes, exámenes, solicitudes, disponibilidad, agendamiento y agenda administrativa.

Por esa razón debe implementarse después de que el flujo Doc. Palma esté funcionando.

### Ingreso público

- **P0** Crear página pública de ingreso.
- **P0** Crear formulario de datos personales.
- **P0** Permitir adjuntar orden médica.
- **P0** Registrar paciente externo.
- **P0** Crear solicitud externa.

### Revisión administrativa

- **P0** Marcar solicitud como pendiente de revisión.
- **P0** Crear listado de solicitudes pendientes.
- **P0** Revisar orden médica.
- **P0** Asociar exámenes correctos.
- **P0** Aprobar solicitud para agendamiento.
- **P0** Generar acceso de agendamiento.

### Reutilización del flujo existente

Una vez aprobada la solicitud, el paciente externo debe utilizar el mismo proceso de agendamiento construido en la Etapa 8.

---

## Etapa 11 — Confirmaciones

Las confirmaciones dependen de que ya existan reservas reales.

- **P1** Listar próximas reservas.
- **P1** Identificar reservas pendientes de confirmación.
- **P1** Configurar anticipación de confirmación.
- **P1** Registrar confirmación manual.
- **P1** Registrar intento de contacto.
- **P1** Mostrar estado de confirmación en agenda.

---

## Etapa 12 — Mejoras de operación y experiencia

Estas tareas mejoran la experiencia de administración, pero no son necesarias para validar el flujo principal.

- **P2** Crear vista semanal de agenda.
- **P2** Mostrar reservas del día en el resumen administrativo.
- **P2** Mostrar próximas reservas en el resumen administrativo.
- **P2** Mostrar solicitudes pendientes en el resumen administrativo.
- **P2** Mostrar confirmaciones pendientes en el resumen administrativo.
- **P2** Mejorar visualización del historial del paciente.
- **P2** Mejorar manejo de excepciones de disponibilidad.

---

## Orden resumido de implementación

1. Acceso administrativo.
2. Tipos de examen.
3. Pacientes.
4. Horarios.
5. Bloqueos.
6. Solicitudes Doc. Palma.
7. Motor de disponibilidad.
8. Agendamiento de pacientes derivados.
9. Agenda administrativa.
10. Pacientes externos.
11. Confirmaciones.
12. Mejoras de operación.

---

## Primer hito funcional recomendado

El primer gran hito debería ser completar las etapas 1 a 9.

Al finalizar ese punto debe ser posible:

1. registrar exámenes;
2. registrar pacientes;
3. configurar horarios;
4. crear una solicitud proveniente de Doc. Palma;
5. generar un enlace;
6. permitir que el paciente seleccione sus exámenes;
7. calcular horarios disponibles;
8. reservar una hora;
9. visualizar la reserva en la agenda;
10. reagendarla o cancelarla administrativamente.

Ese hito valida prácticamente todo el núcleo del sistema antes de agregar el flujo más complejo de pacientes externos.

---

## Segundo hito funcional recomendado

Agregar el flujo de pacientes externos.

Debe ser posible:

1. recibir los datos del paciente;
2. recibir una copia de su orden;
3. revisar la solicitud;
4. asociar los exámenes correspondientes;
5. habilitar el agendamiento;
6. reutilizar el mismo motor de disponibilidad y reserva.

---

## Tercer hito funcional recomendado

Agregar herramientas de seguimiento operativo:

1. confirmaciones;
2. próximos pacientes;
3. solicitudes pendientes;
4. mejoras del calendario administrativo;
5. mejoras generales de experiencia.
# 13. Fuera del MVP inicial

Las siguientes funcionalidades pueden considerarse posteriormente, pero no son necesarias para validar la primera versión:

- WhatsApp automático.
- SMS automático.
- Correos automáticos.
- Confirmación automática mediante enlace.
- Reagendamiento autónomo por parte del paciente.
- Cancelación autónoma por parte del paciente.
- Pagos online.
- Pago de reserva.
- Facturación.
- Ficha clínica completa.
- Registro de resultados de exámenes.
- Entrega online de resultados.
- Firma digital de documentos.
- Integración con sistemas médicos externos.
- Integración con agenda de terceros.
- Estadísticas avanzadas.
- Reportes financieros.
- Múltiples sucursales.
- Aplicación móvil.
- Gestión avanzada de permisos.
- Automatización de feriados.
- Recordatorios mediante WhatsApp Business.
- Integraciones con aseguradoras o Isapres.

---

# 14. Preguntas para reunión de levantamiento de requisitos

## Sobre el funcionamiento de la consulta

1. ¿Cuántas personas realizan actualmente los exámenes?
2. ¿Existe una sola agenda o varias personas pueden atender simultáneamente?
3. ¿Todos los exámenes los realiza la misma persona?
4. ¿Existen exámenes que dependan de una máquina específica?
5. ¿Cuántos equipos existen de cada tipo?
6. ¿Dos pacientes pueden estar realizando exámenes diferentes simultáneamente?
7. ¿Algunos exámenes deben realizarse necesariamente en un orden específico?
8. ¿Hay combinaciones de exámenes que requieran más o menos tiempo que la suma normal de sus duraciones?
9. ¿Se necesita tiempo de preparación, limpieza o descanso entre pacientes?

---

## Sobre los exámenes

10. ¿Cuáles son todos los tipos de examen que ofrece actualmente?
11. ¿Cuánto dura aproximadamente cada examen?
12. ¿La duración es fija o puede variar?
13. ¿Existen exámenes que no puedan ser agendados directamente por pacientes?
14. ¿Existen exámenes que siempre deban revisarse antes de agendar?
15. ¿Cada examen tiene instrucciones previas para el paciente?
16. ¿Necesitamos mostrar esas instrucciones antes de reservar?
17. ¿Existen restricciones por edad, condición u otra característica?

---

## Sobre Doc. Palma

18. ¿Cómo recibe actualmente las órdenes provenientes de Doc. Palma?
19. ¿Qué datos del paciente recibe normalmente?
20. ¿Qué datos podrían faltar?
21. ¿La orden llega como fotografía, PDF, papel, mensaje u otro formato?
22. ¿Siempre vienen claramente identificados los exámenes?
23. ¿El sistema necesita almacenar una copia de la orden?
24. ¿Puede una misma orden utilizarse en más de una reserva?
25. ¿El paciente necesariamente debe realizar todos los exámenes indicados?
26. ¿Puede elegir hacer solamente algunos?

---

## Sobre pacientes externos

27. ¿Qué información mínima debe ingresar un paciente externo?
28. ¿Debe ser obligatorio ingresar RUT?
29. ¿Debe ser obligatorio ingresar teléfono?
30. ¿Debe ser obligatorio ingresar correo?
31. ¿Qué formatos de archivo deberían permitirse para subir la orden?
32. ¿Debe permitirse una fotografía tomada desde el celular?
33. ¿El paciente puede seleccionar sus propios exámenes?
34. ¿O la consulta debe revisar primero la orden?
35. ¿Quién será responsable de revisar las solicitudes externas?
36. ¿Qué ocurre si la orden es ilegible?
37. ¿Qué ocurre si falta información?
38. ¿Cómo se contactará al paciente en esos casos?

---

## Sobre la agenda

39. ¿Cuáles son los días normales de atención?
40. ¿Cuál es el horario normal de atención?
41. ¿Existen horarios distintos según el día?
42. ¿Existe horario de colación?
43. ¿Se atienden algunos sábados?
44. ¿Se necesita abrir días u horarios extraordinarios?
45. ¿Cómo se manejan actualmente los feriados?
46. ¿Cómo se manejan vacaciones o días sin atención?
47. ¿Con cuánto tiempo de anticipación puede reservar un paciente?
48. ¿Se puede reservar para el mismo día?
49. ¿Existe un tiempo mínimo antes de una reserva?
50. ¿Cuánto tiempo hacia el futuro debería mostrar disponibilidad?
51. ¿Los horarios se ofrecen cada 5, 10, 15, 20 o 30 minutos?
52. ¿La duración de la reserva debe ser exactamente la suma de los exámenes?
53. ¿La administradora puede sobreescribir restricciones de agenda?
54. ¿Puede insertar una reserva aunque normalmente el sistema no la permita?

---

## Sobre reagendamientos y cancelaciones

55. ¿El paciente puede solicitar un reagendamiento?
56. ¿Puede reagendar por sí mismo o solamente la consulta?
57. ¿Puede cancelar por sí mismo?
58. ¿Hasta cuánto tiempo antes puede cancelar?
59. ¿Qué ocurre cuando un paciente cancela?
60. ¿El horario debe quedar disponible inmediatamente?
61. ¿Se necesita guardar un historial de cambios de hora?
62. ¿Es importante conocer quién realizó un cambio?

---

## Sobre confirmaciones

63. ¿Cuánto tiempo antes se confirma una cita actualmente?
64. ¿Se realiza una sola confirmación o varias?
65. ¿Por qué medio se confirma hoy?
66. ¿WhatsApp es el medio principal?
67. ¿Necesitan solamente recordar al paciente o exigir una confirmación?
68. ¿Qué ocurre si el paciente no responde?
69. ¿Se cancela automáticamente alguna cita no confirmada?
70. ¿La consulta quiere ver una lista diaria de pacientes pendientes de confirmar?
71. ¿Necesitan registrar cuándo se intentó contactar al paciente?

---

## Sobre los datos del paciente

72. ¿Qué datos necesitan guardar obligatoriamente?
73. ¿El RUT será el principal identificador del paciente?
74. ¿Pueden existir pacientes sin RUT?
75. ¿Necesitan fecha de nacimiento?
76. ¿Necesitan dirección?
77. ¿Necesitan previsión de salud?
78. ¿Necesitan guardar observaciones administrativas?
79. ¿Necesitan registrar antecedentes médicos o solamente datos para agenda?

---

## Sobre la experiencia del paciente

80. ¿El paciente debe crear una cuenta?
81. ¿O debería poder reservar solamente mediante su enlace?
82. ¿El enlace de Doc. Palma debe vencer?
83. ¿Puede reutilizarse el enlace después de haber agendado?
84. ¿Qué información puede ver el paciente al abrirlo?
85. ¿Debe poder revisar posteriormente su reserva?
86. ¿Debe recibir algún comprobante después de agendar?
87. ¿Qué información debe contener ese comprobante?
88. ¿Debe mostrar dirección, indicaciones para llegar o información de preparación?

---

## Sobre la administración

89. ¿Cuántas personas utilizarán el sistema?
90. ¿Todas deberían tener las mismas capacidades?
91. ¿Necesitan distintos tipos de usuario?
92. ¿Quién podrá cambiar horarios de atención?
93. ¿Quién podrá modificar exámenes?
94. ¿Quién podrá cancelar o reagendar pacientes?
95. ¿Se necesita saber qué usuario realizó cada modificación?

---

## Sobre el volumen de atención

96. ¿Cuántos pacientes atienden aproximadamente por día?
97. ¿Cuántas reservas reciben por semana?
98. ¿Qué porcentaje proviene de Doc. Palma?
99. ¿Qué porcentaje corresponde a pacientes externos?
100. ¿Cuántas solicitudes suelen quedar pendientes simultáneamente?

---

# 15. Preguntas críticas que deben resolverse antes de cerrar el MVP

Aunque todas las preguntas anteriores son útiles, las siguientes tienen impacto directo en el diseño funcional y deberían resolverse primero:

1. ¿Una sola persona/equipo atiende todos los exámenes o existen recursos que pueden utilizarse simultáneamente?
2. ¿Los pacientes externos pueden identificar correctamente los exámenes de su orden?
3. ¿La consulta debe revisar una orden externa antes de permitir el agendamiento?
4. ¿Cómo se calcula realmente la duración cuando un paciente tiene varios exámenes?
5. ¿Qué horarios y reglas determinan la disponibilidad?
6. ¿Puede el paciente reagendar o cancelar por sí mismo?
7. ¿Con cuánto tiempo de anticipación deben confirmarse las reservas?
8. ¿Qué datos personales son realmente obligatorios?
9. ¿Es necesario guardar la orden médica dentro del sistema?
10. ¿Cuántas personas administrarán la agenda y necesitan distintos permisos?

---

# 16. Criterio de éxito del MVP

La primera versión se considerará funcional si permite completar de principio a fin estos dos escenarios:

## Escenario A — Doc. Palma

1. La consulta recibe una orden.
2. Registra o encuentra al paciente.
3. Registra los exámenes.
4. Genera un enlace.
5. El paciente abre el enlace.
6. Selecciona sus exámenes.
7. Selecciona un horario válido.
8. La reserva aparece en la agenda.
9. La administradora puede reorganizarla.
10. La consulta puede controlar posteriormente su confirmación.

## Escenario B — Paciente externo

1. El paciente recibe el enlace público.
2. Ingresa sus datos.
3. Adjunta su orden.
4. La consulta revisa la solicitud si corresponde.
5. Se determinan los exámenes.
6. El paciente agenda.
7. La reserva aparece en la agenda.
8. Desde ahí se gestiona igual que cualquier otra reserva.

Si ambos escenarios pueden realizarse de forma simple y sin depender de conversaciones manuales para coordinar la hora, el MVP habrá cumplido su objetivo principal.
