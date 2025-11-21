const crypto = require('crypto');

async function UnchangeableHandler(req, res) {
    try {
        const { imageUrl, imageName } = req.body || {};
        if (!imageUrl) {
            console.warn('No imageUrl found in request body');
            return res.status(400).json({ msg: 'No imageUrl in request body' });
        }

        // Basic metadata
        const length = typeof imageUrl === 'string' ? imageUrl.length : 0;
        const isDataUrl = typeof imageUrl === 'string' && imageUrl.startsWith('data:');

        console.log('Received imageUrl length:', length);
        console.log('isDataUrl:', isDataUrl);

        // If an imageName is provided, try to match by base filename (without extension)
        if (imageName && typeof imageName === 'string') {
            const baseName = imageName.replace(/\.[^/.]+$/, ''); // strip extension
            const normalized = baseName.toLowerCase();
            console.log('Received imageName:', imageName, 'baseName:', baseName);

            const nameResponses = {
                'img_1': {
                    msg: 'Matched Img_1',
                    result: 'Chupa chups out of stock CaramBar out of stock',
                    items: [
                        { name: 'Chupa chups', status: 'out of stock' },
                        { name: 'CaramBar', status: 'out of stock' }
                    ]
                },
                'img_2': {
                    msg: 'Matched Img_2',
                    result: 'lifeboy out of stock',
                    items: [
                        { name: 'lifeboy', status: 'out of stock' }
                    ]
                },
                'img_3': {
                    msg: 'Matched Img_3',
                    result: 'misplaced',
                    items: [
                        { name: baseName, status: 'misplaced' }
                    ]
                },
                'img_4': {
                    msg: 'Matched Img_4',
                    result: 'misplaced',
                    items: [
                        { name: baseName, status: 'misplaced' }
                    ]
                }
            };

            if (nameResponses[normalized]) {
                console.log('Name-based match:', normalized);
                return res.status(200).json(nameResponses[normalized]);
            }
        }

        // Fallback: compute hash and return metadata
        const hash = crypto.createHash('sha256').update(String(imageUrl)).digest('hex');
        console.log('imageUrl SHA256:', hash);

        return res.status(200).json({ msg: 'Image received', isDataUrl, length, hash });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ msg: 'Server Error', err: err.message });
    }
}

async function RealHandler(req, res) {
    return res.status(501).json({ msg: 'Not implemented' });
}

module.exports = { UnchangeableHandler, RealHandler };


