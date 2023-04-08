import { useRouter } from 'next/router'
import {useEffect, useState} from "react";
import Link from "next/link";
import {CharacterBosses, CharacterEquips, CharacterImage, CharacterSymbols} from "@/components/character_info";
import styles from '@/styles/Home.module.css'


export default function ViewCharacter() {

    const [data, setData] = useState([]);
    const router = useRouter();
    const {character} = router.query;

    useEffect(() => {
        // DO NULL
        setData(JSON.parse(localStorage.getItem(character + "_prog"))[0]);
    }, []);

    return (
        <>
            <div className={styles.character_view}>
                <CharacterImage image={data.preview}/>
                <CharacterSymbols symbols={data.symbols} name={data.name}/>
                <CharacterEquips equips={data.equips} name={data.name}/>
                <CharacterBosses bosses={data.bosses} name={data.name}/>
            </div>
            <Link href="/">
                <button>Back</button>
            </Link>
        </>
    )
}