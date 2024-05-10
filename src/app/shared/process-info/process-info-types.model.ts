export const ProcessInfoTypeConfig = {
    RESEARCH: {
        iconType: 'BEAKER',
        headingText: 'Research & Strategy',
        subHeadingText:'Confirm.',
        descriptionText: 'Ensure that the design that has been created by the UI UX team is in accordance with existing business processes. Then divide the task to the team to carry out slicing.'
    },
    DESIGN: {
        iconType: 'LIGHT_BULB',
        headingText: 'Design',
        subHeadingText:'Slicing UI',
        descriptionText: 'In this step I, in this step, a UI is created based on the previously confirmed figma.'
    },
    DEV: {
        iconType: 'CODE',
        headingText: 'Integration',
        subHeadingText:'Integration API.',
        descriptionText:'This step is Integrate with the API that the Backend team has created.'
    },
    QA: {
        iconType: 'CHECK_SHIELD',
        headingText: 'Quality Assurance',
        subHeadingText:'Testing. ',
        descriptionText:'This step manual and automatic testing is carried out on the UI and existing feature functions.'
    }
}

export enum ProcessInfoTypes {
    RESEARCH = 'RESEARCH',
    DESIGN = 'DESIGN',
    DEV = 'DEV',
    QA = 'QA'
}
