"use client"
import ReactStories from "react-insta-stories";
import { cn } from '@/shared/lib/utils';
import { Api } from '@/shared/services/api-client';
import { IStory } from '@/shared/services/stories';
import React, { useEffect } from 'react'
import Container from './container';
import { X } from 'lucide-react';

type Props = {
    className?: string,
}

function stories({className}: Props) {
    const [stories, setStories] = React.useState<IStory[]>([]);
    const [open, setOpen] = React.useState(false);
    const [selectedStory, setSelectedStory] = React.useState<IStory>();


    useEffect(() => {
        async function fetchStories() {
            try {
                const data = await Api.stories.getAll();
                setStories(data);
            } catch (error) {
                console.error('Error fetching stories:', error);
            }
        }

        fetchStories();
    }, []);


    const onCLickStory = (story: IStory) => {
        setSelectedStory(story);
        if(story.items.length > 0){
            setOpen(true);
        }
    }
  return (
    <Container
        className = {cn('flex items-center justify-between gap-2 my-10', className)}>
            {stories.length === 0 && 
                [...Array(6)].map((_, index) => (
                        <div key={index} className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse"></div>
                ))
            }
            {stories.map(story => (
                <img 
                    key={story.id}
                    src={story.previewImageUrl}
                    onClick={() => onCLickStory(story)}
                    className='rounded-md cursor-pointer'
                    height={250}
                    width={200}
                />
            ))}

            {
                open && (
                    <div className="fixed left-0 top-0 right-0 bottom-0 w-full h-full bg-black/80 flex items-center justify-center z-40">
                        <div className="relative" style={{width: 520}}>
                            <button className='absolute -top-5 -right-10 ' onClick={() => setOpen(false)}> 
                                <X className='absolute top-0 right-0 w-8 h-8 text-white/80'/>
                            </button>
                            <ReactStories
                                onAllStoriesEnd={() => setOpen(false)}
                                stories={selectedStory?.items.map(item => ({url: item.sourceUrl})) || []}
                                defaultInterval={3000}
                                width={520}
                                height={800}
                            />
                        </div>
                    </div>
                )
            }
    </Container>
  )
}

export default stories