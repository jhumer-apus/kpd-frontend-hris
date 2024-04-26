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

    return (
        <Modal
            open={isOpenModal}
            onClose={() => setIsOpenModal(false)}
        >
            <ModalDialog>
                <div className='flex items-center gap-4'>
                    <MegaphoneIcon className='h-6 w-6'/>
                    <Typography variant="h6" className=''>Announcement</Typography>
                </div>
                <div className='p-12 overflow-auto'>
                    <Typography variant="h5" className=''>{details?.message}</Typography>
                    <div className='flex items-center gap-4 mt-8'>
                        <img className='rounded-full w-12 h-12' src={`${APILink.replace('/api/v1/', '')}${details?.imageUrl}`} alt={details?.altText} />
                        <Typography variant="h6">{`${details?.posted_by}`}</Typography>
                    </div>
                </div>
            </ModalDialog>
        </Modal>
    )
}