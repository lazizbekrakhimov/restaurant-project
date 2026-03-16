import Image from 'next/image';
import React from 'react'

interface LeafProps {
    style: React.CSSProperties;
}

const Leaf = ({ style }: LeafProps) => (
    <div className="absolute pointer-events-none z-20" style={style}>
        <Image src="/images/leaf.png" alt="" fill className="object-contain" />
    </div>
);


export default Leaf