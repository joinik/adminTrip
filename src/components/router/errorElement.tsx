import './errorElement.scss';
import { isResponseError } from '@/utils/assert';
import { useEffect, useState } from 'react';
import { Link, useRouteError } from 'react-router-dom';

export const ErrorElement = () => {
  const error = useRouteError();
  const [detail, setDetail] = useState<{
    description?: string;
    stack?: string;
    errorCode?: string;
  }>({});

  useEffect(() => {
    if (error instanceof Error) {
      const errorCode = Reflect.get(error, 'code') ?? 'Unknown';
      setDetail({
        description: error.message,
        errorCode,
        stack: error.stack,
      });
    }

    if (isResponseError(error)) {
      setDetail({
        description: `${error.errorCode} ${error.message}`,
        errorCode: `HTTP ${error.status} ${error.code}`,
        stack: `${error.method} ${error.url}`,
      });
    }
  }, [error]);
  return (
    <aside className="error-view">
      <div>
        <p>
          {'>'} <span>ERROR CODE</span>: "<i>{detail.errorCode}</i>"
        </p>
        <p>
          {'>'} <span>ERROR DESCRIPTION</span>: "<i>{detail.description}</i>"
        </p>
        <p>
          {'>'} <span>ERROR POSSIBLY CAUSED BY</span>: "<i>{detail.stack}</i>"
        </p>
        <p>
          {'> '}
          <span>
            SOME PAGES ON THIS SERVER THAT YOU DO HAVE PERMISSION TO ACCESS
          </span>
          : [<Link to="/">Home Page</Link>]
        </p>
        <p>
          {'>'} <span>HAVE A NICE DAY :-)</span>
        </p>
      </div>
    </aside>
  );
};
