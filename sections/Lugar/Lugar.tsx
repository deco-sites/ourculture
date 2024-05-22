import type { Temperature } from 'apps/weather/loaders/temperature.ts'

export interface Props {
    title: string
    /**
     * @format html
     */
    description: string
    temperature: Temperature | null
}

export default function Lugar({
    title,
    description,
    temperature
}: Props) {
    return (
        <div class="my-6 py-8 px-2 flex flex-col items-center justify-center gap-8 bg-accent lg:flex-row">
            <div class="flex flex-col justify-center gap-4 max-w-screen-sm">
                <h2 class="font-bold text-4xl text-center lg:text-left">
                    {title}
                </h2>
                <div 
                    class="text-center lg:text-left"
                    dangerouslySetInnerHTML={{ __html: description }}
                >
                </div>
            </div>
            <p class="text-2xl p-4 bg-white text-black rounded-xl">
                {temperature?.celsius} °C
            </p>
        </div>
    )
}