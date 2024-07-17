import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function index({ auth, projects, queryParams = null }) {
    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) => {

        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }

        router.get(route('project.index'), queryParams);
    }

    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return;

        searchFieldChanged(name, e.target.value);
        
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Proyectos</h2>}
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* <pre>{JSON.stringify(projects, undefined, 2)}</pre> */}

                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700  uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-3">ID</th>
                                    <th className="px-3 py-3">Imagen</th>
                                    <th className="px-3 py-3">Nombre</th>
                                    <th className="px-3 py-3">Estado</th>
                                    <th className="px-3 py-3">Fecha Creacion</th>
                                    <th className="px-3 py-3">Fecha Actualizacion</th>
                                    <th className="px-3 py-3">Creado Por</th>
                                    <th className="px-3 py-3 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <thead className="text-xs text-gray-700  uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-3"></th>
                                    <th className="px-3 py-3"></th>
                                    <th className="px-3 py-3">
                                        <TextInput
                                            className="w-full"
                                            defaultValue={queryParams.name}
                                            placeholder="Nombre del proyecto"
                                            onBlur={(e) => searchFieldChanged('name', e.target.value)}
                                            onKeyPress={(e) => onKeyPress('name', e)}
                                        ></TextInput>
                                    </th>
                                    <th className="px-3 py-3">
                                        <SelectInput 
                                            className="w-full"
                                            defaultValue={queryParams.status}
                                            onChange={(e) => searchFieldChanged("status", e.target.value)}

                                        >
                                            <option value="">Selecciona estado</option>
                                            <option value="pendiente">Pendiente</option>
                                            <option value="en_progreso">En Progreso</option>
                                            <option value="completado">Completado</option>
                                        </SelectInput>
                                    </th>
                                    <th className="px-3 py-3"></th>
                                    <th className="px-3 py-3"></th>
                                    <th className="px-3 py-3"></th>
                                    <th className="px-3 py-3"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.data.map((project) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={project.id}>
                                        <td className="px-3 py-2">{project.id}</td>
                                        <td className="px-3 py-2">
                                            <img src={project.image_path} style={{ width: 60 }} alt="" />
                                        </td>
                                        <th className="px-3 py-2">{project.name}</th>
                                        <th className="px-3 py-2">
                                            <span className={"px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]}>
                                                {PROJECT_STATUS_TEXT_MAP[project.status]}
                                            </span>
                                        </th>
                                        <th className="px-3 py-2">{project.created_at}</th>
                                        <th className="px-3 py-2 text-nowrap">{project.due_date}</th>
                                        <th className="px-3 py-2 text-nowrap">{project.createdBy.name}</th>
                                        <th className="px-3 py-2">
                                            <Link href={route('project.edit', project.id)}
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                                Editar
                                            </Link>
                                            <Link href={route('project.destroy', project.id)}
                                                className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                                                Eliminar
                                            </Link>
                                        </th>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        <Pagination links={projects.meta.links}></Pagination>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}