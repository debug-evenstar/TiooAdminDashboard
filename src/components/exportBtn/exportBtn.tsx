import { useState } from 'react';
import Button from '../button/button'
import Menu, { TMenuProps } from '../menu/menu'

export default function ExportBtn({ className, children }: { children: string, className?: string }) {

    const [ active, setActive ] = useState(false);

    const data: TMenuProps[] = [
        { id: 1, name: 'Weekly Report' },
        { id: 2, name: 'Daily Report' },
        { id: 3, name: 'Monthly Report' },
    ];

    return (
        <div>
            <Button onClick={() => setActive(!active)} className={className}>{children}</Button>
            { active && 
                <Menu values={data} />
            }
        </div>
    )
}
