import React from 'react';
import {FormattedMessage} from 'react-intl';

import poseHandBlocksIconURL from './pose-hand.png';
import poseHandInsetIconURL from './pose-hand-small-3.svg';

const entry = {
    name: "Hand Sensing",
    extensionId: 'poseHand',
    iconURL: poseHandBlocksIconURL,
    insetIconURL: poseHandInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="Sense hand movement with the camera."
            description="PoseNet Description"
            id="gui.extension.pose_hand.description"
        />
    ),
    featured: true
};

export {entry}; // loadable-extension needs this line.
export default entry;
