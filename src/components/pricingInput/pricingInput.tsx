import { ChangeEvent } from "react";
import NairaInput from "../nairaInput/nairaInput";

type TPricingInputProps = { state: any, setState: any, name: string, readOnly: boolean };

export default function PricingInput({ name, state, setState, readOnly }: TPricingInputProps){
    const handler = (e: ChangeEvent<HTMLInputElement>, type: string) => {
        let temp = e.target.value.replace('/\Dg', '');
        temp = temp.replaceAll(',', '');
        if (temp === '')
            temp = '0';

        let result = Number.parseInt(temp);

        if (isNaN(result))
            result = 0;

        setState({
            ...state,
            [type]: result,
        })
    }


    return (
        <div className="mt-5 grid grid-cols-4 gap-x-5">
            <div className="">
                <p className="mb-2 text-sm text-gray-400 ">{name[0].toUpperCase() + name.slice(1)}</p>
                <NairaInput
                    className="py-2.5" name={name}
                    value={name && state[name].toLocaleString()}
                    readonly={readOnly}
                    handler={(e: any) => handler(e, name)} />
                    
            </div>
            <div className="">
                <p className="mb-2 text-sm text-gray-400 ">3 months</p>
                <NairaInput
                    className="py-2.5" name={name + ':3months'}
                    value={name && state['3months'].toLocaleString()}

                    readonly={readOnly}
                    handler={(e: any) => handler(e, '3months')} />

            </div>
            <div className="">
                <p className="mb-2 text-sm text-gray-400 ">6 months </p>
                <NairaInput
                    className="py-2.5" name={name + ':6months'}
                    value={name && state['6months'].toLocaleString()}
                    readonly={readOnly}
                    handler={(e: any) => handler(e, '6months')} />

            </div>
            <div className="">
                <p className="mb-2 text-sm text-gray-400 ">1 year </p>
                <NairaInput
                    className="py-2.5" name={name + ':1year'}
                    value={name && state['1year'].toLocaleString()}
                    readonly={readOnly}
                    handler={(e: any) => handler(e, '1year')} />
            </div>
        </div>
    );
}
