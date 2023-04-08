import styles from '@/styles/Home.module.css'
import Image from "next/image";
import Link from 'next/link'
import {useEffect, useState} from "react";
import {CharacterShowcase} from "@/components/character_info";

export default function Home() {


    return (
        <>
            <div className={styles.character_showcase}>
                <CharacterShowcase/>
                <br/>
                <Link href="/add">
                    <button>Add Character</button>
                </Link>
            </div>
        </>
    )
}
