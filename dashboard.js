document.addEventListener('DOMContentLoaded', () => {

    // -- SIMULATION LOGIC --
    const loadEl = document.getElementById('systemLoad');
    const neuralEl = document.getElementById('neuralStability');
    const nodesEl = document.getElementById('activeNodes');

    // These bars are now animated by CSS, we only update text numbers
    let sysLoad = 34;
    let neural = 98.2;
    let nodes = 4102;

    setInterval(() => {
        if (loadEl) {
            const loadChange = Math.floor(Math.random() * 5) - 2;
            sysLoad = Math.max(20, Math.min(70, sysLoad + loadChange));
            loadEl.innerText = sysLoad + '%';
        }

        if (neuralEl) {
            const neuralChange = (Math.random() * 0.4) - 0.2;
            neural = Math.max(95, Math.min(100, neural + neuralChange));
            neuralEl.innerText = neural.toFixed(1) + '%';
        }

        if (nodesEl) {
            const nodesChange = Math.floor(Math.random() * 10) - 5;
            nodes = Math.max(4000, Math.min(5000, nodes + nodesChange));
            nodesEl.innerText = nodes.toLocaleString();
        }
    }, 2000);


    // -- UPLOAD LOGIC --
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const fileInfo = document.getElementById('fileInfo');

    // Processing Modal
    const processingModal = document.getElementById('processingModal');

    if (dropZone && fileInput) {
        // Handle click on the entire zone
        dropZone.addEventListener('click', (e) => {
            if (e.target !== fileInput) {
                fileInput.click();
            }
        });

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('drag-over');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            handleFiles(e.dataTransfer.files);
        });

        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });
    }

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            const isPDF = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

            if (isPDF) {
                // Show Processing Modal
                if (processingModal) {
                    processingModal.classList.add('active');
                }

                // Simulate Processing Delay (10 seconds)
                setTimeout(() => {
                    if (processingModal) {
                        processingModal.classList.remove('active');
                    }

                    // Show Success in Upload Box
                    if (fileInfo) {
                        fileInfo.innerHTML = `<span style="color:#00b894; font-weight:bold"><i class='bx bx-check-circle'></i> ANALYSIS COMPLETE.</span><br><span style="font-size:0.8rem; color:var(--text-secondary)">Neural Model for "${file.name}" Updated.</span>`;
                    }
                }, 10000);

            } else {
                if (fileInfo) {
                    fileInfo.innerHTML = `<span style="color:#ef4444"><i class='bx bx-error'></i> Error: PDF files only. (Detected: ${file.name})</span>`;
                }
            }
        }
    }
});
