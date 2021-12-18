export async function fetchTemplate(templateName) {
    const template = await fetch(`./templates/${templateName}.html`);
    return template;
}