export const getNumberOfSickLeaves = (remarks: string | null):number => {

    if(remarks) {

        const index = remarks?.indexOf("=");

        if(index != -1) {
            const numberOfSickLeaves = remarks?.substring((index?? 0) + 1);

            return parseInt(numberOfSickLeaves?.slice(0,1)) ?? 0;
        }
        return 0;

    }
    return 0
}

export const cleanRemarks = (remarks:string | null)  => {
    if(remarks) {

        const index = remarks?.indexOf("SL");

        if (index != -1) { // Check if the substring is found

            const cleanRemarks = remarks?.slice(0,index); 
            return cleanRemarks

        }
        return "";
    }
}