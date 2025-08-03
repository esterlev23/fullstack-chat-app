import setuptools

setuptools.setup(
    name="fastapi-gpt",
    version="1.0.0",
    package_dir={"": "app"},
    install_requires=[
        "openai",
        "fastapi",
        "pydantic",
    ],
    extras_require={
        "server": ["fastapi"],
    },
)