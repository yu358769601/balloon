export default class NLog
{
    public static level: number

    public static print(level: number, tag: string, text: string)
    {
        if(level >= this.level)
        {
            console.log("[" + tag + "] " + text)
        }
    }

    public static verbose(tag: string, text: string)
    {
        this.print(0, tag, text)
    }

    public static info(tag: string, text: string)
    {
        this.print(1, tag, text)
    }

    public static error(tag: string, text: string)
    {
        console.error("[" + tag + "] " + text)
    }

    public static warn(tag: string, text: string)
    {
        console.warn("[" + tag + "] " + text)
    }
}