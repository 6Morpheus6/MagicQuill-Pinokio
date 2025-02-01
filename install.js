module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          "git clone --recursive https://github.com/ant-research/MagicQuill app",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install gradio_magicquill-0.0.1-py3-none-any.whl",
          "uv pip install -r requirements.txt"
        ]
      }
    },
    {
      when: "{{platform === 'win32'}}",
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "copy /Y pyproject.toml MagicQuill\\LLaVA\\",
          "uv pip install -e MagicQuill\\LLaVA\\",
//          "uv pip uninstall -y torch torchvision torchaudio"
        ]
      },
        next: "torch"
    },
    {
      when: "{{platform !== 'win32'}}",
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "cp -f pyproject.toml MagicQuill/LLaVA/",
          "uv pip install -e MagicQuill/LLaVA/",
//          "uv pip uninstall -y torch torchvision torchaudio"
        ]
      }
    },
    {
      id: "torch",
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app",
          // xformers: true
        }
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "git clone https://huggingface.co/LiuZichen/MagicQuill-models models"
        ]
      }
    },
    {
      method: "fs.link",
      params: {
        venv: "app/env"
      }
    }
  ]
}
