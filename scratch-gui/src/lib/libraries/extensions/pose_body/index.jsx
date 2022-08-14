import React from 'react';
import {FormattedMessage} from 'react-intl';

import poseBodyBlocksIconURL from './pose-body.png';
import poseBodyInsetIconURL from './pose-body-small.svg';

const entry = {
    name: "Body Sensing",
    extensionId: 'poseBody',
    iconURL: poseBodyBlocksIconURL,
    insetIconURL: poseBodyInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="Sense body position with the camera."
            description="PoseNet Description"
            id="gui.extension.pose_body.description"
        />
    ),
    featured: true
};

export {entry}; // loadable-extension needs this line.
export default entry;
