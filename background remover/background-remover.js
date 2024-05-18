const fileInput = document.getElementById('fileInput');
    const imagePreview = document.getElementById('imagePreview');
    const downloadLink = document.getElementById('downloadLink');

    fileInput.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          imagePreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    async function removeBackground() {
      const apiKey = 'BKuyVj5MTiRCWpXC4Cc4E6EN';
      const file = fileInput.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('image_file', file);
      formData.append('size', 'auto');
      formData.append('format', 'png');
      formData.append('type', 'auto');

      try {
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
          method: 'POST',
          headers: {
            'X-Api-Key': apiKey
          },
          body: formData
        });
        const result = await response.blob();
        const imageURL = URL.createObjectURL(result);
        imagePreview.src = imageURL;
        downloadLink.href = imageURL;
        downloadLink.download = 'image_without_bg.png';
        downloadLink.style.display = 'block';
      } catch (error) {
        console.error('Error removing background:', error);
      }
    }