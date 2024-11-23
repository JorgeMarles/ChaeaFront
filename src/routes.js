import React from 'react'
import { Roles } from './util/userUtils.js'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(
  () => import('./views/theme/typography/Typography'),
)

//CHAEA DEVELOP
//admin grupos
const AdministrarGrupos = React.lazy(
  () => import('./views/administrarGrupos/AdministrarGrupos'),
)

//ACTUALIZAR CUENTA DE USUARIO
const ActualizarEstudiante = React.lazy(
  () => import('./views/miCuenta/actualizarEstudiante/ActualizarEstudiante.js'),
)

//ACTUALIZAR CUENTA DE USUARIO
const AsignarCuestionarios = React.lazy(
  () => import('./views/asigCuestionario/AsignarCuestionarios'),
)

//ACTUALIZAR CUENTA DE PROFESOR
const ActualizarProfesor = React.lazy(
  () => import('./views/miCuenta/actualizarProfesor/ActualizarProfesor.js'),
)
//Profesor grupos
/*
const ProfesorGrupos = React.lazy(
  () => import('./views/profesorGrupos/ProfesorGrupos'),
)
*/
const ProfesorGrupo = React.lazy(
  () => import('./views/profesorGrupos/ProfesorGrupo'),
)

const ProfesorGruposV2 = React.lazy(
  () => import('./views/profesorGrupos/ProfesorGruposV2'),
)

const GestionarCuestionariosParaGrupo = React.lazy(
  () => import('./views/profesorGrupos/GestionarCuestionariosParaGrupo.jsx'),
)
const ReporteGrupo = React.lazy(
  () => import('./views/profesorGrupos/ReporteGrupo'),
)

const TestAPI = React.lazy(
  () => import('./views/testAPI/TestAPI.jsx')
)
//Estudiante Vista Cuestionarios
const EstudianteVistaCuestionarios = React.lazy(
  () =>
    import(
      './views/estudianteVistaCuestionarios/EstudianteVistaCuestionarios.js'
    ),
)
const ProfesorVistaCuestionarios = React.lazy(
  () =>
    import(
      './views/profesorVistaCuestionarios/ProfesorVistaCuestionarios.js'
    ),
)

const CrearCuestionarios = React.lazy(
  () =>
    import(
      './views/profesorVistaCuestionarios/CrearCuestionarios.js'
    ),
)

const ResponderCuestionario = React.lazy(
  () =>
    import('./views/estudianteVistaCuestionarios/ResponderCuestionario.jsx'),
)

const AsignarRoles = React.lazy(
  () =>
    import('./views/asigRoles/AsignarRoles'),
)

const ResultadoCuestionario = React.lazy(
  () =>
    import('./views/estudianteVistaCuestionarios/CuestionarioResuelto.jsx'),
)


const Login = React.lazy(() => import('./views/pages/login/Login.js'))
////////////////////////////////////////////////

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(
  () => import('./views/base/breadcrumbs/Breadcrumbs'),
)
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(
  () => import('./views/base/list-groups/ListGroups'),
)
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(
  () => import('./views/base/paginations/Paginations'),
)
const Placeholders = React.lazy(
  () => import('./views/base/placeholders/Placeholders'),
)
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(
  () => import('./views/buttons/button-groups/ButtonGroups'),
)
const Dropdowns = React.lazy(
  () => import('./views/buttons/dropdowns/Dropdowns'),
)

//Forms
const ChecksRadios = React.lazy(
  () => import('./views/forms/checks-radios/ChecksRadios'),
)
const FloatingLabels = React.lazy(
  () => import('./views/forms/floating-labels/FloatingLabels'),
)
const FormControl = React.lazy(
  () => import('./views/forms/form-control/FormControl'),
)
const InputGroup = React.lazy(
  () => import('./views/forms/input-group/InputGroup'),
)
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(
  () => import('./views/forms/validation/Validation'),
)

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(
  () => import('./views/icons/coreui-icons/CoreUIIcons'),
)
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tabs', name: 'Tabs', element: Tabs },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  {
    path: '/buttons/button-groups',
    name: 'Button Groups',
    element: ButtonGroups,
  },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  {
    path: '/forms/checks-radios',
    name: 'Checks & Radios',
    element: ChecksRadios,
  },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  {
    path: '/forms/floating-labels',
    name: 'Floating Labels',
    element: FloatingLabels,
  },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  {
    path: '/notifications',
    name: 'Notifications',
    element: Alerts,
    exact: true,
  },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

const sinasignar = [
  //CHAEA DEVELOP
  //
  //admin  TOTAL grupos
  // Profesor Administrar Grupos
  /*
  {
    path: '/profesorGrupos',
    name: 'Administrar Grupos',
    element: ProfesorGrupos,
  },
  */
  // DESPLEGABLE DE CUENTAS
  //Actualizar mi cuenta user
  {
    path: '/miCuenta/actualizarEstudiante',
    name: 'Actualizar Cuenta de Estudiante',
    element: ActualizarEstudiante,
  },
  //Actualizar cuenta profesor
  {
    path: '/miCuenta/actualizarProfesor',
    name: 'Actualizar Cuenta de Profesor',
    element: ActualizarProfesor,
  },
  //Vistas Cuestionarios Estudiante
  {
    path: '/estudianteVistaCuestionarios',
    name: 'Vista de mis Cuestionarios',
    element: EstudianteVistaCuestionarios,
  },
]

const protectedRoutes = [
  {
    path: '/cuenta/actualizar-cuenta-estudiante/',
    name: 'Actualizar mi cuenta',
    element: ActualizarEstudiante,
    roles: [Roles.ESTUDIANTE_ACTIVO, Roles.ESTUDIANTE_INCOMPLETO],
  },
  {
    path: '/cuestionarios/',
    name: 'Cuestionarios',
    element: EstudianteVistaCuestionarios,
    roles: [Roles.ESTUDIANTE_ACTIVO],
  },
  //GESTION DE CUESTIONARIOS PARA PROFESOR
  {
    path: '/administrar-cuestionarios/',
    name: 'Administrar Cuestionarios',
    element: ProfesorVistaCuestionarios,
    roles: [Roles.ADMINISTRADOR, Roles.PROFESOR_ACTIVO],
  },
  //CREACION CUESTIONARIOS
  {
    path: '/crear-cuestionarios/',
    name: 'Crear Cuestionarios',
    element: CrearCuestionarios,
    roles: [Roles.ADMINISTRADOR, Roles.PROFESOR_ACTIVO],
  },
  //ASIGNAR CUESTIONARIOS
  {
    path: '/asginar-cuestionarios/',
    name: 'Asignar Cuestionarios',
    element: AsignarCuestionarios,
    roles: [Roles.ADMINISTRADOR, Roles.PROFESOR_ACTIVO],
  },
  {
    path: '/cuestionario/:id/responder/',
    name: 'Responder cuestionario',
    element: ResponderCuestionario,
    roles: [Roles.ESTUDIANTE_ACTIVO],
  },
  {
    path: '/cuestionario/:id/resultado/',
    name: 'Resultado de cuestionario',
    element: ResultadoCuestionario,
    roles: [Roles.ESTUDIANTE_ACTIVO],
  },

  {
    path: '/cuenta/actualizar-cuenta-profesor/',
    name: 'Actualizar mi cuenta',
    element: ActualizarProfesor,
    roles: [
      Roles.PROFESOR_ACTIVO,
      Roles.PROFESOR_INCOMPLETO,
      Roles.PROFESOR_NO_APROBADO,
      Roles.ADMINISTRADOR,
    ],
  },
  /*
  {
    path: '/grupos/',
    name: 'Mis Grupos',
    element: ProfesorGrupos,
    roles: [Roles.ADMINISTRADOR, Roles.PROFESOR_ACTIVO],
  },
  */
  {
    path: '/grupos/',
    name: 'Mis Grupos',
    element: ProfesorGruposV2,
    roles: [Roles.ADMINISTRADOR, Roles.PROFESOR_ACTIVO],
  },
  {
    path: '/grupos/:id',
    name: 'Ver grupo',
    element: ProfesorGrupo,
    roles: [Roles.ADMINISTRADOR, Roles.PROFESOR_ACTIVO],
  },
  {
    path: '/resultado/:id',
    name: 'Ver Resultados grupo',
    element: GestionarCuestionariosParaGrupo,
    roles: [Roles.ADMINISTRADOR, Roles.PROFESOR_ACTIVO],
  },
  {
    path: '/grupos/aplicaciones-cuestionarios/',
    name: 'Resultados de Grupos',
    element: null ,
    roles: [Roles.ADMINISTRADOR, Roles.PROFESOR_ACTIVO],
  },
  {
    path: '/estudiante/:id/resultados/',
    name: 'Resultado de Estudiante',
    element: null,
    roles: [Roles.ADMINISTRADOR, Roles.PROFESOR_ACTIVO],
  },
  {
    path: '/cuentas/',
    name: 'Administrar cuentas',
    element: AsignarRoles,
    roles: [Roles.ADMINISTRADOR],
  },
  ///PROVISIONAL
  {
    path: '/test/',
    name: 'Test API',
    element: TestAPI,
    roles: [Roles.ADMINISTRADOR, Roles.ESTUDIANTE_ACTIVO]
  }
]

export default routes
export { protectedRoutes }