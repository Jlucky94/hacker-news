import React, {FC} from 'react';
import {Link} from "@mui/material";

type Props = {
    url: string
}
const LongLink: FC<Props> = ({url}) => {

    // const maxLength = 30;
    // const displayedUrl = url.length > maxLength ? `${url.substring(0, maxLength)}...` : url;

    const displayedUrl = url&& new URL(url).hostname;

    return (
        <Link href={url} underline="none" color="gray" style={{marginLeft: 5}}>
            ({displayedUrl})
        </Link>
    )
}

export default LongLink;