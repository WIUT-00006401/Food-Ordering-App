"use client"
import Link from "next/link";
import { useProfile } from "../../../components/UseProfile";
import UserTabs from "../../../components/layout/UserTabs";
// import EditableImage from "../../../components/layout/EditableImage";
// import Right from "../../../components/icons/Right";
import Left from "../../../components/icons/Left";
import { useState } from "react";
import { redirect } from "next/navigation";
import MenuItemForm from "../../../components/layout/MenuItemForm";
import toast from "react-hot-toast";

export default function NewMenuItemPage() {

    // const [image, setImage] = useState('')
    // const [name, setName] = useState('')
    // const [description, setDescription] = useState('')
    // const [basePrice, setBasePrice] = useState('')
    const [redirectToItems, setRedirectToItems] = useState(false)
    const { loading, data } = useProfile()

    async function handleFormSubmit(ev, data) {
        ev.preventDefault()
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            })
            if (response.ok)
                resolve()
            else
                reject()
        })

        await toast.promise(savingPromise, {
            loading: 'Saving this tasty item',
            success: 'Saved',
            error: 'Error'
        })

        setRedirectToItems(true)

    }

    if (redirectToItems) {
        return redirect('/menu-items')
    }

    if (loading) {
        return 'Loading user info'
    }

    if (!data.admin) {
        return 'Not an admin.'
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={true} />
            <div className="max-w-2xl mx-auto mt-8">
                <Link href={'/menu-items'} className="button">
                    <Left />
                    <span>Show all menu items</span>
                </Link>
            </div>
            <MenuItemForm onSubmit={handleFormSubmit} menuItem={null} />
        </section>
    )


}