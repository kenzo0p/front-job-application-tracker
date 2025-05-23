import { useEffect, useState } from 'react';
import icons from '@/lib/icons';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { SquareArrowOutUpRightIcon } from 'lucide-react';

const mockProjects = [
  {
    id: 1,
    projectName: "Todo App",
    projectThumbnail: "https://picsum.photos/200",
    projectSummary: "A simple todo application with React",
    stack: "React, TypeScript, Tailwind",
    projectLiveLink: "https://example.com",
    projectGithub: "https://github.com/example"
  },
  {
    id: 2,
    projectName: "Weather App",
    projectThumbnail: "https://picsum.photos/201",
    projectSummary: "Weather forecast application",
    stack: "Next.js, TypeScript",
    projectLiveLink: "https://example.com",
    projectGithub: "https://github.com/example"
  }
];

export function UserProjects() {
  const [projects, setProjects] = useState(mockProjects);

  if (!projects) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <icons.loading className="animate-spin w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-3 mt-4">
      {projects.map((item) => (
        <Card
          key={item.id}
          className="flex flex-col md:col-span-2 col-span-4 border-2 hover:bg-slate-100 dark:hover:bg-slate-900 text-black dark:text-white transition-shadow duration-300"
        >
          <div className="flex items-center justify-center aspect-video w-full h-[200px] overflow-hidden object-contain rounded-2xl p-1 mt-1">
            {item.projectThumbnail ? (
              <img
                alt={item.projectName}
                src={item.projectThumbnail}
                className={`h-[200px] hover:scale-110 transition-transform duration-300`}
              />
            ) : (
              <div className="flex items-center justify-center h-[200px] rounded-2xl bg-slate-400 dark:bg-slate-900">
                <span className="text-3xl font-semibold">
                  {item.projectName}
                </span>
              </div>
            )}
          </div>
          <CardHeader>
            <CardTitle className="text-lg font-semibold uppercase flex items-center justify-between">
              {item.projectName}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-start">
            <p className="mb-4">{item.projectSummary}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            {item.stack && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold">Stack:</span>
                <span className="text-xs">{item.stack}</span>
              </div>
            )}
            <div className="flex items-center justify-center gap-4">
              {item.projectLiveLink && (
                <Link
                  to={item.projectLiveLink}
                  className="text-blue-500 hover:underline"
                >
                  <SquareArrowOutUpRightIcon size={16} />
                </Link>
              )}
              <Link
                to={item.projectGithub}
                className="text-blue-500 hover:underline"
              >
                <icons.github />
              </Link>
            </div>
          </CardFooter>
        </Card>
      ))}
      {projects.length === 0 && (
        <div className="flex items-center justify-center col-span-4 h-full">
          <icons.alert size={24} />
          <span className="ml-2">No Projects Found</span>
        </div>
      )}
    </div>
  );
}