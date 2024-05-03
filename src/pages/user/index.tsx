import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, Button, List, Popconfirm, Skeleton } from 'antd';
import { userDateGet, userEdit } from '@/api';
import { tailErr } from '@/utils';
import { AnimaView } from '@/components/animaRouter';
import { PushUserModal } from './component/pushNoteModal';

type top = (action: 'edit' | 'reload') => void;

const App: React.FC = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<User[]>([]);
  const [list, setList] = useState<User[]>([]);
  const [editVisible, setEditVisible] = useState(false);
  const [item, setItem] = useState({} as User);

  useEffect(() => {
    userDateGet()
      .then(res => {
        const { info, total } = res;
        setInitLoading(false);
        setData(info as User[]);
        setList(info as User[]);
        setTotal(total);
      })
      .catch(tailErr);
  }, []);

  //根据分页加载数据
  const onLoadMore = async (page: number) => {
    setLoading(true);
    const { info } = await userDateGet(page);
    if (!info) return null;
    const newData = data.concat(info as User[]);
    setInitLoading(false);
    setData(newData);
    setList(newData);
    window.dispatchEvent(new Event('resize'));
  };

  //使用记忆回调函数
  const onTop:top = useCallback(
    (action: 'edit' | 'reload', item: User) => {
      if (action === 'edit') {
        setEditVisible(true);
        setItem(item);
      }
    },
    [setEditVisible, setItem],
  );

  return (
    <AnimaView>
      <article>
        <List
          pagination={{
            position: 'bottom',
            align: 'center',
            total: total,
            onChange(page) {
              onLoadMore(page);
            },
          }}
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          dataSource={list}
          renderItem={item => (
            <List.Item
              actions={[
                <Popconfirm
                  title="温馨提示"
                  description="是否删除该用户"
                  onConfirm={async () => {
                    await noteRemove(row.id);
                    onTop('reload', row);
                  }}
                  okText="确认"
                  cancelText="取消"
                >
                  <Button type={'link'} danger>
                    删除
                  </Button>
                </Popconfirm>,
                <a key="list-loadmore-edit" onClick={() => onTop('edit', item)}>
                  edit
                </a>,
              ]}
            >
              <Skeleton avatar title={false} loading={item?.loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={item?.picture?.large} />}
                  title={<a href="https://ant.design">{item.name}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </Skeleton>
            </List.Item>
          )}
        />

        {/* 编辑弹窗 */}
        <PushUserModal
          title="用户编辑"
          request={userEdit}
          open={editVisible}
          setOpen={setEditVisible}
          initData={item}
        />
      </article>
    </AnimaView>
  );
};

export default App;
