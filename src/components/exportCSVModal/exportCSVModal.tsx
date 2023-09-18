// const ExportCSVModal = ({ modal, setModal, children }: { modal: boolean, setModal: any, children?: any }) => {
//     const modalClasses = modal
//         ? 'fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out opacity-100'
//         : 'fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out opacity-0 pointer-events-none';

//     return (
//         <div className={modalClasses}>
//             {/* Dark transparent overlay */}
//             <div className="fixed inset-0 bg-black opacity-40" onClick={() => setModal(false)}></div>

//             {/* Modal content */}
//             <div className="bg-white rounded-lg p-4 max-w-md w-full">
//                 {/* Close button */}
//                 <button className="absolute top-2 right-2 text-gray-500" onClick={() => setModal(false)}>
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-6 w-6"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                     >
//                         <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M6 18L18 6M6 6l12 12"
//                         />
//                     </svg>
//                 </button>

//                 {/* Modal content */}
//                 lfkajkl
//             </div>
//         </div>
//     );
// };

// export default ExportCSVModal;


const exportOptions: any = [
    {id: 0, name: 'Schools'},
    {id: 0, name: 'Freelancers'},
    {id: 0, name: 'Teachers'},
    {id: 0, name: 'Students'},
    {id: 0, name: 'Hybrid'},
];

export default function ExportCSVModal({ modal, setModal }: { modal?: boolean, setModal?: any }) {
    const styling = modal
        ? 'bg-[#00000033] z-[20] fixed inset-0 h-screen w-screen pt-20 overflow-hidden flex justify-center opacity-100'
        : 'bg-[#00000033] z-[20] fixed inset-0 h-screen w-screen pt-0 overflow-hidden flex justify-center opacity-0 pointer-events-none'

    return (
        <div className={`transition-all ease-in-out duration-500 ${styling}`}>

            <div className="w-[25.3rem] delay-[1s] h-[27.6rem] text-primary bg-white flex flex-col justify-between">
                <div>
                    <div className="w-full px-5 py-2 flex items-center justify-between border-b">
                        <h1>Export CSV</h1>
                        <button onClick={() => setModal(false)} className="font-[200] outline-none text-2xl">&times;</button>
                    </div>
                    <div className="mt-8 px-5">
                        <ul>
                            {exportOptions.map((option: any) => (
                                <li key={option.id} className=" py-1 mb-4 shadow border px-4 bg-white rounded-[4px] w-full flex items-center">
                                    <input type="checkbox" className="w-4 h-4" />
                                    <span className="ml-2 text-gray-400">{option.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="w-full px-5 py-2 border-t flex items-center justify-between border-b">
                    <button className="font-[500] text-white w-full py-2 bg-main rounded-[8px] ">Export</button>
                </div>
            </div>

        </div>
    )
}
