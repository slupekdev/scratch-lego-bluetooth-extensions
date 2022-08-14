import React from 'react';
import {FormattedMessage} from 'react-intl';

import poseFaceBlocksIconURL from './pose-face.png';
import poseFaceInsetIconURL from './pose-face-small.svg';

const entry = {
    name: "Face Sensing",
    extensionId: 'poseFace',
    iconURL: poseFaceBlocksIconURL,
    insetIconURL: poseFaceInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="Sense face movement with the camera."
            description="PoseNet Description"
            id="gui.extension.pose_face.description"
        />
    ),
    featured: true
};

export {entry}; // loadable-extension needs this line.
export default entry;
