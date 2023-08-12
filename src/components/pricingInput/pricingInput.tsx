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
                    className="py-2.5" name={name + ':quarter'}
                    value={name && state['quarter'].toLocaleString()}

                    readonly={readOnly}
                    handler={(e: any) => handler(e, 'quarter')} />

            </div>
            <div className="">
                <p className="mb-2 text-sm text-gray-400 ">6 months </p>
                <NairaInput
                    className="py-2.5" name={name + ':half'}
                    value={name && state['half'].toLocaleString()}
                    readonly={readOnly}
                    handler={(e: any) => handler(e, 'half')} />

            </div>
            <div className="">
                <p className="mb-2 text-sm text-gray-400 ">1 year </p>
                <NairaInput
                    className="py-2.5" name={name + ':year'}
                    value={name && state['year'].toLocaleString()}
                    readonly={readOnly}
                    handler={(e: any) => handler(e, 'year')} />
            </div>
        </div>
    );
}
