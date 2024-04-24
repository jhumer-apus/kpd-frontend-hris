import { APILink } from '@/store/configureStore';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { MegaphoneIcon } from "@heroicons/react/24/outline";

interface Props {
    details: any;
    isOpenModal: boolean;
    setIsOpenModal: any;
}

export default function ShowAnnouncementModal(props: Props) {

    //PROPS
    const { details, isOpenModal, setIsOpenModal } = props
    

    console.log(details)

    return (
        <Modal
            open={isOpenModal}
            onClose={() => setIsOpenModal(false)}
        >
            <ModalDialog
            >   
                <div className='flex items-center gap-4'>
                    <MegaphoneIcon className='h-6 w-6'/>
                    <Typography variant="h6" className=''>Announcement</Typography>
                </div>
                <Typography variant="h3" className=''>{details?.message}</Typography>
                <div className='flex items-center gap-4 mt-8'>
                    <img className='rounded-full w-12 h-12' src={`${APILink.replace('/api/v1/', '')}${details?.imageUrl}`} alt={details?.altText} />
                    <Typography variant="h6">{`${details?.posted_by}`}</Typography>
                </div>
            </ModalDialog>
        </Modal>
    )
}