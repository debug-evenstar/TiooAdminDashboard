import { VictoryPie } from "victory";

export type TPiechartDataProps = {
    x: string,
    y: number
}

export default function PieChart({ data }:{ data: TPiechartDataProps[] }){

    const accents: string[] = [
        '#F1350C',
        '#4F46E5',
        '#FAC036',
        '#E9E9E9'
    ];
    return(
        <div className="w-[220px] h-[240px] p-3 border-2 rounded-[8px]">
            <h1>Churned Users</h1>
            <div className="w-28 h-28 mb-7 mx-auto mt-2">
                <VictoryPie
                    data={data}
                    colorScale={accents}
                    // get rid of the labels
                    labels={() => null}
                />
            </div>
            <div className="grid grid-cols-2 text-center gap-y-2 gap-x-2">
                {
                    data.map((entry,index) => (
                        <div key={index} className="flex text-xs items-center">
                            <div style={{backgroundColor: accents[index]}} className="w-4 h-4 mr-1 rounded-sm"></div>
                            <span>{entry.x}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
