# agendamiento

# Mapa de dominios e interacciones — Agenda de Exámenes Ópticos

## 1. Vista general de dominios

```mermaid
flowchart TD
    ID[Identidad / Usuarios]
    EX[Exámenes]
    PA[Pacientes]
    REQ[Solicitudes de Exámenes]
    AV[Disponibilidad]
    BL[Bloqueos]
    AP[Reservas / Agenda]
    AU[Auditoría]

    ID --> EX
    ID --> PA
    ID --> REQ
    ID --> AV
    ID --> BL
    ID --> AP

    EX --> REQ
    PA --> REQ

    AV --> AP
    BL --> AV

    REQ --> AP
    PA --> AP
    EX --> AP

    EX --> AU
    PA --> AU
    REQ --> AU
    AV --> AU
    BL --> AU
    AP --> AU
```

### Lectura del diagrama

- **Identidad / Usuarios** permite saber quién opera el sistema.
- **Exámenes** define el catálogo de tipos de examen.
- **Pacientes** mantiene la información de las personas atendidas.
- **Solicitudes de Exámenes** representa lo que fue indicado por Doc. Palma o por un paciente externo.
- **Disponibilidad** define horarios base de atención.
- **Bloqueos** modifica la disponibilidad real.
- **Reservas / Agenda** representa la hora agendada por el paciente.
- **Auditoría** registra cambios sobre módulos modificables.

---

## 2. Vista conceptual principal

```mermaid
classDiagram
    class Patient {
        +id
        +name
        +rut
        +phone
        +email
        +birthDate?
        +notes?
        +active
    }

    class ExamType {
        +id
        +name
        +durationMinutes
        +description
        +instructions
        +active
    }

    class ExamRequest {
        +id
        +patientId
        +origin
        +status
        +medicalOrderFile?
        +notes?
        +createdAt
    }

    class ExamRequestItem {
        +id
        +examRequestId
        +examTypeId
    }

    class AvailabilityRule {
        +id
        +dayOfWeek
        +startTime
        +endTime
        +breaks?
        +active
    }

    class TimeBlock {
        +id
        +date
        +startTime
        +endTime
        +reason?
        +type
    }

    class Appointment {
        +id
        +patientId
        +examRequestId?
        +date
        +startTime
        +endTime
        +durationMinutes
        +status
        +confirmationStatus
        +notes?
    }

    class AppointmentExamType {
        +id
        +appointmentId
        +examTypeId
    }

    class AuditLog {
        +id
        +entityType
        +entityId
        +action
        +before
        +after
        +userId
        +createdAt
    }

    Patient "1" --> "0..*" ExamRequest
    ExamRequest "1" --> "1..*" ExamRequestItem
    ExamRequestItem "* " --> "1" ExamType

    Patient "1" --> "0..*" Appointment
    ExamRequest "0..1" --> "0..*" Appointment
    Appointment "1" --> "1..*" AppointmentExamType
    AppointmentExamType "* " --> "1" ExamType

    AvailabilityRule "1" --> "0..*" Appointment
    TimeBlock --> AvailabilityRule
```

---

## 3. Relaciones explicadas en lenguaje simple

### Paciente
Es la persona que será atendida.

Se relaciona con:

- muchas **solicitudes**;
- muchas **reservas**.

---

### Tipo de examen
Es el catálogo base de exámenes que ofrece la consulta.

Se relaciona con:

- los ítems de una **solicitud**;
- los ítems de una **reserva**.

---

### Solicitud de exámenes
Representa el requerimiento original.

Puede venir desde:

- **Doc. Palma**
- **Paciente externo**

Contiene:

- un paciente;
- uno o varios exámenes solicitados;
- eventualmente una orden médica adjunta;
- un estado.

Una solicitud puede existir **antes** de que haya una reserva.

---

### Reserva / Appointment
Representa una hora concreta en la agenda.

Contiene:

- un paciente;
- opcionalmente una solicitud asociada;
- fecha y horario;
- duración total;
- estado;
- exámenes que efectivamente se realizarán.

Una reserva depende del cálculo de disponibilidad.

---

### Disponibilidad
Define las reglas base de atención:

- días;
- horario de inicio;
- horario de término;
- pausas.

No es una reserva, sino la base para construir la agenda disponible.

---

### Bloqueos
Son excepciones o interrupciones sobre la disponibilidad:

- bloqueo de un tramo horario;
- bloqueo de un día completo;
- vacaciones;
- colación;
- ajustes puntuales.

Los bloqueos alteran lo que el motor de disponibilidad puede ofrecer.

---

### Auditoría
Registra cambios relevantes de entidades modificables.

Ejemplos:

- creación de tipo de examen;
- edición de paciente;
- cambio de estado de una reserva;
- reagendamiento;
- desactivación de un examen.

---

## 4. Dependencias por etapa

```mermaid
flowchart LR
    E1[Exámenes]
    P1[Pacientes]
    H1[Horarios]
    B1[Bloqueos]
    S1[Solicitudes]
    D1[Disponibilidad]
    R1[Reservas]
    C1[Confirmaciones]

    E1 --> S1
    P1 --> S1
    H1 --> D1
    B1 --> D1
    S1 --> R1
    D1 --> R1
    E1 --> R1
    P1 --> R1
    R1 --> C1
```

### Lectura

- **Solicitudes** dependen de:
  - Exámenes
  - Pacientes

- **Disponibilidad** depende de:
  - Horarios
  - Bloqueos

- **Reservas** dependen de:
  - Solicitudes
  - Disponibilidad
  - Pacientes
  - Exámenes

- **Confirmaciones** dependen de:
  - Reservas existentes

---