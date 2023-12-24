"use client"
import React from 'react'
import styled from 'styled-components'
import {useGlobalState} from "@/app/context/globalProvider"
import Image from "next/image"
import menu from "@/app/utils/menu"
import Link from 'next/link'
import Button from '../Button/Button'
import { useRouter, usePathname } from 'next/navigation'
import { logout } from '@/app/utils/Icons'
import { useClerk, UserButton } from '@clerk/nextjs'

const Sidebar = () => {

    const {theme} = useGlobalState()
    const {signOut} = useClerk()
    const router = useRouter()
    const pathname = usePathname()

    const handleClick = (link: string) => {
        router.push(link)
    }

  return (
    <SidebarStyled theme={theme}>
        <div className="profile">
            <div className="profile-overlay"></div>
            <div className="image">    
                <Image height={50} width={50} src='/admin.png' alt='profile' />
            </div>
            <h1>
                <span>John</span>
                <span>Doe</span>
            </h1>
        </div>
        <ul className="nav-items">
            {menu.map((item) => {
                const link=item.link
                return <li key={item.id} className={`nav-item ${pathname===link ? "active" : ""}`} onClick={() => handleClick(link)}>
                    {item.icon}
                    <Link href={link}>{item.title}</Link>
                </li>
            })}
        </ul>
        <div className="sign-out relative m-6">
            <Button
                name={"Sign Out"}
                type={"submit"}
                padding={"0.4rem 0.8rem"}
                borderRad={"0.8rem"}
                fw={"500"}
                fs={"1.2rem"}
                icon={logout}
                click={() => {
                    signOut(() => router.push("/signin"));
                }}
            />
        </div>
    </SidebarStyled>
  )
}

const SidebarStyled = styled.nav`
    position: relative;
    width: ${(props) => props.theme.sidebarWidth};
    background-color: ${(props) => props.theme.colorBg2};
    border: 2px solid ${(props) => props.theme.borderColor};
    border-radius: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    color: ${(props) => props.theme.colorGrey3};

    .profile {
        margin: 1.5rem;
        padding: 1rem 0.8rem;
        position: relative;

        border-radius: 1rem;
        cursor: pointer;

        font-weight: 500;
        color: white;

        display: flex;
        align-items: center;

        .profile-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            background: ${(props) => props.theme.colorBg3};
            backdrop-filter: blur(10px);
            transition: all 0.55s linear;
            opacity: 0.2;
            border: 2px solid ${(props) => props.theme.borderColor2};
            border-radius: 1rem;

        }

        h1 {
            font-size: 1.2rem;
            display: flex;
            flex-direction: column;
            line-height: 1.4rem;
        }

        .image, h1 {
            position: relative;
            z-index: 1;                
        }

        .image{
            flex-shrink: 0;
            display: inline-block;
            overflow: hidden;

            img {
                border-radius: 100%;
                transition: all 0.5s ease;
            }
        }

        >h1 {
            margin-left: .8rem;
            font-size: clamp(1.2rem, 4vw, 1.4rem);
            line-height: 100%;

        }

        &:hover {
            .profile-overlay{
                opacity: 1;
                border: 2px solid ${(props) => props.theme.borderColor2};
            }

            img {
                transform: scale(1.1);
            }
        }
    }

    .nav-item {
        position: relative;
        padding: 0.8rem 1rem 0.8rem 2.1rem;
        margin: 0.3rem 0;
        display: grid;
        grid-template-columns: 40px 1fr;
        cursor: pointer;
        align-items: center;
        
        &::after {
            position: absolute;
            content: "";
            left: 0;
            top: 0;
            width: 0;
            height: 100%;
            background-color: ${(props) => props.theme.activeNavLinkHover};
            z-index: 1;
            transition: all 0.3s ease-in-out;
        }

        &::before {
            position: absolute;
            content: "";
            right: 0;
            top: 0;
            width: 0%;
            height: 100%;
            background-color: ${(props) => props.theme.colorGreenDark};
      
            border-bottom-left-radius: 5px;
            border-top-left-radius: 5px;
        }

        a{
            font-weight: 500;
            z-index: 2;
            transition: all 0.3s ease-in-out;
        }

        i{
            display: flex;
            align-items: center;
            color: ${(props) => props.theme.colorIcons};
        }

        &:hover {
            &::after {
                width: 100%;
            }
        }
    }

    .active {
        background-color: ${(props) => props.theme.activeNavLink};

        i, a{
            color: ${(props) => props.theme.colorIcons2};
        }
    }

    .active::before {
        width: 0.3rem;
    }

    > button {
        margin: 1.5rem;
    }
`;

export default Sidebar