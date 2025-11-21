import React, { useRef, useEffect, useState } from 'react';

function Upload({ autoOpen = false, onClose, onUploaded }) {
    const inputRef = useRef(null);
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        if (autoOpen && inputRef.current) {
            inputRef.current.click();
        }
    }, [autoOpen]);

    const handleFiles = (e) => {
        const files = Array.from(e.target.files || []);

        if (files.length === 0) {
            onClose?.();
            return;
        }

        const readers = files.map(file => new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = () => resolve({ data_url: reader.result, file });
            reader.readAsDataURL(file);
        }));

        Promise.all(readers).then(images => {
            setPreviews(images);
            console.log('Selected images:', images);

            const payload = images.map((img, idx) => ({
                data_url: img.data_url,
                name: img.file && img.file.name ? img.file.name : `file_${idx}`
            }));

            if (onUploaded) onUploaded(payload);
        });
    };

    return (
        <div className="upload-component">
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                onChange={handleFiles}
            />


            {previews.length > 0 && (
                <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {previews.map((p, idx) => (
                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src={p.data_url} alt={`preview-${idx}`} style={{ width: 120, height: 'auto', borderRadius: 8 }} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Upload;
