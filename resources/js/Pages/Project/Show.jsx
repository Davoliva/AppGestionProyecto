import { PROJECT_STATUS_TEXT_MAP, PROJECT_STATUS_CLASS_MAP } from '@/constants'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'
import TaskTable from '../Task/TaskTable'


export default function Show({ auth, project, tasks, queryParams }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {`Proyecto "${project.name}"`}
                </h2>}
        >
            {/* <pre>{JSON.stringify(project, undefined, 2)}</pre> */}
            <Head title={`Project "${project.name}"`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <img src={project.image_path} alt="" className='w-full h-64 object-cover' />
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-500">
                            <div className='grid gap-1 grid-cols-2 mt-2'>
                                <div>
                                    <div className='mt-4'>
                                        <div>
                                            <label className='font-bold text-lg'>ID del proyecto</label>
                                            <p className='mt-1'>{project.id}</p>
                                        </div>
                                    </div>
                                    <div className='mt-4'>
                                        <div >
                                            <label className='font-bold text-lg'>Nombre del proyecto</label>
                                            <p className='mt-1'>{project.name}</p>
                                        </div>
                                    </div>

                                    <div className='mt-4'>
                                        <label className='font-bold text-lg'>Estado del proyecto</label>
                                        <p className='mt-1'>
                                            <span className={"px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]}>
                                                {PROJECT_STATUS_TEXT_MAP[project.status]}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div className='mt-4'>
                                        <label className='font-bold text-lg'>Fecha de vencimiento</label>
                                        <p className='mt-1'>{project.due_date}</p>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold text-lg'>Fecha de creacion</label>
                                        <p className='mt-1'>{project.created_at}</p>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold text-lg'>Actualizado por</label>
                                        <p className='mt-1'>{project.updatedBy.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-4'>
                                <label className='font-bold text-lg'>Descripcion del proyecto</label>
                                <p className='mt-1'>{project.description}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-500">
                            <TaskTable tasks={tasks} queryParams={queryParams}></TaskTable>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
