import { QuaggaJSConfigObject } from '@ericblade/quagga2';

export const DEFAULT_CONFIG: QuaggaJSConfigObject = {
    inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: null,
        constraints: {
            width: { min: 250 },
            height: { min: 100 },
            aspectRatio: { min: 1, max: 2 },
            facingMode: 'environment', // or user
        },
        singleChannel: true // true: only the red color-channel is read
    },
    locator: {
        patchSize: 'medium',
        halfSample: true
    },
    locate: false,
    numOfWorkers: 4,
    decoder: {
        readers: ['code_128_reader']
    }
};
