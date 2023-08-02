import Button from '../button/button'
import Menu, { TMenuProps } from '../menu/menu'
import Popup from 'reactjs-popup';

export default function ExportMenuBtn({ entries,className, children }: { entries:TMenuProps[], children: string, className?: string }) {

    return (
        <div>
            <Popup
                position="bottom right"
                on="click"
                trigger={
                    <button>
                        <Button className={className}>{children}</Button>
                    </button>
                }
            >
                <Menu values={entries} />
            </Popup>

        </div>
    )
}
