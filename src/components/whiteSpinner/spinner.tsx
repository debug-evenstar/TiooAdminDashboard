import { PulseLoader } from 'react-spinners';

export default function WhiteSpinner(){
	return (
		<PulseLoader color="white" size={4} />
		// <div className="w-6 h-6 mx-auto rounded-full  border-white animate-spin"></div>
	);
}