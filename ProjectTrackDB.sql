PGDMP      7                |            ProjectTrack    16.3    16.3 X    X           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            Y           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            Z           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            [           1262    156592    ProjectTrack    DATABASE     �   CREATE DATABASE "ProjectTrack" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Costa Rica.1252';
    DROP DATABASE "ProjectTrack";
                ProjectTrack    false            �            1259    157372    assignments    TABLE     m  CREATE TABLE public.assignments (
    id integer NOT NULL,
    permissions_id integer[] NOT NULL,
    name character varying(100) NOT NULL,
    description text NOT NULL,
    state_assignment character varying(255) DEFAULT 'Create'::character varying NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.assignments;
       public         heap    ProjectTrack    false            �            1259    157371    assignments_id_seq    SEQUENCE     �   CREATE SEQUENCE public.assignments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.assignments_id_seq;
       public          ProjectTrack    false    233            \           0    0    assignments_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.assignments_id_seq OWNED BY public.assignments.id;
          public          ProjectTrack    false    232            �            1259    156974    members    TABLE     W  CREATE TABLE public.members (
    id integer NOT NULL,
    organization_id integer NOT NULL,
    user_id integer NOT NULL,
    role_id integer NOT NULL,
    state_member character varying(255) DEFAULT 'Create'::character varying NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.members;
       public         heap    ProjectTrack    false            �            1259    156973    members_id_seq    SEQUENCE     �   CREATE SEQUENCE public.members_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.members_id_seq;
       public          ProjectTrack    false    222            ]           0    0    members_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.members_id_seq OWNED BY public.members.id;
          public          ProjectTrack    false    221            �            1259    157077    my_sequence    SEQUENCE     t   CREATE SEQUENCE public.my_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.my_sequence;
       public          postgres    false            �            1259    156949    organizations    TABLE     h  CREATE TABLE public.organizations (
    id integer NOT NULL,
    user_id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text NOT NULL,
    state_organization character varying(255) DEFAULT 'Create'::character varying NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 !   DROP TABLE public.organizations;
       public         heap    ProjectTrack    false            �            1259    156948    organizations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.organizations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.organizations_id_seq;
       public          ProjectTrack    false    218            ^           0    0    organizations_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.organizations_id_seq OWNED BY public.organizations.id;
          public          ProjectTrack    false    217            �            1259    157145    participants    TABLE     g  CREATE TABLE public.participants (
    id integer NOT NULL,
    project_id integer NOT NULL,
    member_id integer NOT NULL,
    assignments_id integer[] NOT NULL,
    state_participant character varying(255) DEFAULT 'Create'::character varying NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
     DROP TABLE public.participants;
       public         heap    ProjectTrack    false            �            1259    157144    participants_id_seq    SEQUENCE     �   CREATE SEQUENCE public.participants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.participants_id_seq;
       public          ProjectTrack    false    229            _           0    0    participants_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.participants_id_seq OWNED BY public.participants.id;
          public          ProjectTrack    false    228            �            1259    157286    permissions    TABLE     F  CREATE TABLE public.permissions (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text NOT NULL,
    state_permission character varying(255) DEFAULT 'Create'::character varying NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.permissions;
       public         heap    ProjectTrack    false            �            1259    157285    permissions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.permissions_id_seq;
       public          ProjectTrack    false    231            `           0    0    permissions_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.permissions_id_seq OWNED BY public.permissions.id;
          public          ProjectTrack    false    230            �            1259    157125    projects    TABLE     �  CREATE TABLE public.projects (
    id integer NOT NULL,
    organization_id integer NOT NULL,
    state_id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text NOT NULL,
    repository_link character varying(255) NOT NULL,
    state_project character varying(255) DEFAULT 'Create'::character varying NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.projects;
       public         heap    ProjectTrack    false            �            1259    157124    projects_id_seq    SEQUENCE     �   CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.projects_id_seq;
       public          ProjectTrack    false    227            a           0    0    projects_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;
          public          ProjectTrack    false    226            �            1259    156964    roles    TABLE     a  CREATE TABLE public.roles (
    id integer NOT NULL,
    permissions_id integer[] NOT NULL,
    name character varying(100) NOT NULL,
    description text NOT NULL,
    state_role character varying(255) DEFAULT 'Create'::character varying NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.roles;
       public         heap    ProjectTrack    false            �            1259    156963    roles_id_seq    SEQUENCE     �   CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.roles_id_seq;
       public          ProjectTrack    false    220            b           0    0    roles_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;
          public          ProjectTrack    false    219            �            1259    156997    states    TABLE     <  CREATE TABLE public.states (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text NOT NULL,
    state_state character varying(255) DEFAULT 'Create'::character varying NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.states;
       public         heap    ProjectTrack    false            �            1259    156996    states_id_seq    SEQUENCE     �   CREATE SEQUENCE public.states_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.states_id_seq;
       public          ProjectTrack    false    224            c           0    0    states_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.states_id_seq OWNED BY public.states.id;
          public          ProjectTrack    false    223            �            1259    157438    tasks    TABLE     %  CREATE TABLE public.tasks (
    id integer NOT NULL,
    project_id integer NOT NULL,
    participant_id integer NOT NULL,
    state_id integer NOT NULL,
    assignment_id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text NOT NULL,
    start_date timestamp with time zone NOT NULL,
    end_date timestamp with time zone NOT NULL,
    state_task character varying(255) DEFAULT 'Create'::character varying NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.tasks;
       public         heap    ProjectTrack    false            �            1259    157437    tasks_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.tasks_id_seq;
       public          ProjectTrack    false    235            d           0    0    tasks_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;
          public          ProjectTrack    false    234            �            1259    156939    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    "last_Name" character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "user_Name" character varying(255) NOT NULL,
    state_user character varying(255) DEFAULT 'Create'::character varying NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.users;
       public         heap    ProjectTrack    false            �            1259    156938    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          ProjectTrack    false    216            e           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          ProjectTrack    false    215            �           2604    157375    assignments id    DEFAULT     p   ALTER TABLE ONLY public.assignments ALTER COLUMN id SET DEFAULT nextval('public.assignments_id_seq'::regclass);
 =   ALTER TABLE public.assignments ALTER COLUMN id DROP DEFAULT;
       public          ProjectTrack    false    232    233    233            �           2604    156977 
   members id    DEFAULT     h   ALTER TABLE ONLY public.members ALTER COLUMN id SET DEFAULT nextval('public.members_id_seq'::regclass);
 9   ALTER TABLE public.members ALTER COLUMN id DROP DEFAULT;
       public          ProjectTrack    false    221    222    222            �           2604    156952    organizations id    DEFAULT     t   ALTER TABLE ONLY public.organizations ALTER COLUMN id SET DEFAULT nextval('public.organizations_id_seq'::regclass);
 ?   ALTER TABLE public.organizations ALTER COLUMN id DROP DEFAULT;
       public          ProjectTrack    false    217    218    218            �           2604    157148    participants id    DEFAULT     r   ALTER TABLE ONLY public.participants ALTER COLUMN id SET DEFAULT nextval('public.participants_id_seq'::regclass);
 >   ALTER TABLE public.participants ALTER COLUMN id DROP DEFAULT;
       public          ProjectTrack    false    229    228    229            �           2604    157289    permissions id    DEFAULT     p   ALTER TABLE ONLY public.permissions ALTER COLUMN id SET DEFAULT nextval('public.permissions_id_seq'::regclass);
 =   ALTER TABLE public.permissions ALTER COLUMN id DROP DEFAULT;
       public          ProjectTrack    false    231    230    231            �           2604    157128    projects id    DEFAULT     j   ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);
 :   ALTER TABLE public.projects ALTER COLUMN id DROP DEFAULT;
       public          ProjectTrack    false    227    226    227            �           2604    156967    roles id    DEFAULT     d   ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);
 7   ALTER TABLE public.roles ALTER COLUMN id DROP DEFAULT;
       public          ProjectTrack    false    219    220    220            �           2604    157000 	   states id    DEFAULT     f   ALTER TABLE ONLY public.states ALTER COLUMN id SET DEFAULT nextval('public.states_id_seq'::regclass);
 8   ALTER TABLE public.states ALTER COLUMN id DROP DEFAULT;
       public          ProjectTrack    false    224    223    224            �           2604    157441    tasks id    DEFAULT     d   ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);
 7   ALTER TABLE public.tasks ALTER COLUMN id DROP DEFAULT;
       public          ProjectTrack    false    234    235    235            ~           2604    156942    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          ProjectTrack    false    216    215    216            S          0    157372    assignments 
   TABLE DATA           x   COPY public.assignments (id, permissions_id, name, description, state_assignment, "createdAt", "updatedAt") FROM stdin;
    public          ProjectTrack    false    233   �n       H          0    156974    members 
   TABLE DATA           p   COPY public.members (id, organization_id, user_id, role_id, state_member, "createdAt", "updatedAt") FROM stdin;
    public          ProjectTrack    false    222   p       D          0    156949    organizations 
   TABLE DATA           u   COPY public.organizations (id, user_id, name, description, state_organization, "createdAt", "updatedAt") FROM stdin;
    public          ProjectTrack    false    218   �p       O          0    157145    participants 
   TABLE DATA           ~   COPY public.participants (id, project_id, member_id, assignments_id, state_participant, "createdAt", "updatedAt") FROM stdin;
    public          ProjectTrack    false    229   :r       Q          0    157286    permissions 
   TABLE DATA           h   COPY public.permissions (id, name, description, state_permission, "createdAt", "updatedAt") FROM stdin;
    public          ProjectTrack    false    231   �r       M          0    157125    projects 
   TABLE DATA           �   COPY public.projects (id, organization_id, state_id, name, description, repository_link, state_project, "createdAt", "updatedAt") FROM stdin;
    public          ProjectTrack    false    227   �t       F          0    156964    roles 
   TABLE DATA           l   COPY public.roles (id, permissions_id, name, description, state_role, "createdAt", "updatedAt") FROM stdin;
    public          ProjectTrack    false    220   *v       J          0    156997    states 
   TABLE DATA           ^   COPY public.states (id, name, description, state_state, "createdAt", "updatedAt") FROM stdin;
    public          ProjectTrack    false    224   uw       U          0    157438    tasks 
   TABLE DATA           �   COPY public.tasks (id, project_id, participant_id, state_id, assignment_id, name, description, start_date, end_date, state_task, "createdAt", "updatedAt") FROM stdin;
    public          ProjectTrack    false    235   �x       B          0    156939    users 
   TABLE DATA           z   COPY public.users (id, name, "last_Name", email, password, "user_Name", state_user, "createdAt", "updatedAt") FROM stdin;
    public          ProjectTrack    false    216   Qy       f           0    0    assignments_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.assignments_id_seq', 3, true);
          public          ProjectTrack    false    232            g           0    0    members_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.members_id_seq', 13, true);
          public          ProjectTrack    false    221            h           0    0    my_sequence    SEQUENCE SET     :   SELECT pg_catalog.setval('public.my_sequence', 1, false);
          public          postgres    false    225            i           0    0    organizations_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.organizations_id_seq', 6, true);
          public          ProjectTrack    false    217            j           0    0    participants_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.participants_id_seq', 13, true);
          public          ProjectTrack    false    228            k           0    0    permissions_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.permissions_id_seq', 40, true);
          public          ProjectTrack    false    230            l           0    0    projects_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.projects_id_seq', 6, true);
          public          ProjectTrack    false    226            m           0    0    roles_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.roles_id_seq', 3, true);
          public          ProjectTrack    false    219            n           0    0    states_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.states_id_seq', 8, true);
          public          ProjectTrack    false    223            o           0    0    tasks_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.tasks_id_seq', 4, true);
          public          ProjectTrack    false    234            p           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 5, true);
          public          ProjectTrack    false    215            �           2606    157380    assignments assignments_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.assignments
    ADD CONSTRAINT assignments_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.assignments DROP CONSTRAINT assignments_pkey;
       public            ProjectTrack    false    233            �           2606    156980    members members_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.members DROP CONSTRAINT members_pkey;
       public            ProjectTrack    false    222            �           2606    156957     organizations organizations_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.organizations DROP CONSTRAINT organizations_pkey;
       public            ProjectTrack    false    218            �           2606    157153    participants participants_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.participants
    ADD CONSTRAINT participants_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.participants DROP CONSTRAINT participants_pkey;
       public            ProjectTrack    false    229            �           2606    157294    permissions permissions_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.permissions DROP CONSTRAINT permissions_pkey;
       public            ProjectTrack    false    231            �           2606    157133    projects projects_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.projects DROP CONSTRAINT projects_pkey;
       public            ProjectTrack    false    227            �           2606    156972    roles roles_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public            ProjectTrack    false    220            �           2606    157005    states states_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.states
    ADD CONSTRAINT states_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.states DROP CONSTRAINT states_pkey;
       public            ProjectTrack    false    224            �           2606    157446    tasks tasks_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_pkey;
       public            ProjectTrack    false    235            �           2606    156947    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            ProjectTrack    false    216            �           2606    157394 $   members members_organization_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id);
 N   ALTER TABLE ONLY public.members DROP CONSTRAINT members_organization_id_fkey;
       public          ProjectTrack    false    4757    222    218            �           2606    157404    members members_role_id_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);
 F   ALTER TABLE ONLY public.members DROP CONSTRAINT members_role_id_fkey;
       public          ProjectTrack    false    4759    220    222            �           2606    157399    members members_user_id_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 F   ALTER TABLE ONLY public.members DROP CONSTRAINT members_user_id_fkey;
       public          ProjectTrack    false    222    216    4755            �           2606    157385 (   organizations organizations_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 R   ALTER TABLE ONLY public.organizations DROP CONSTRAINT organizations_user_id_fkey;
       public          ProjectTrack    false    4755    218    216            �           2606    157430 (   participants participants_member_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.participants
    ADD CONSTRAINT participants_member_id_fkey FOREIGN KEY (member_id) REFERENCES public.members(id);
 R   ALTER TABLE ONLY public.participants DROP CONSTRAINT participants_member_id_fkey;
       public          ProjectTrack    false    4761    229    222            �           2606    157425 )   participants participants_project_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.participants
    ADD CONSTRAINT participants_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id);
 S   ALTER TABLE ONLY public.participants DROP CONSTRAINT participants_project_id_fkey;
       public          ProjectTrack    false    229    4765    227            �           2606    157413 &   projects projects_organization_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id);
 P   ALTER TABLE ONLY public.projects DROP CONSTRAINT projects_organization_id_fkey;
       public          ProjectTrack    false    218    227    4757            �           2606    157418    projects projects_state_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_state_id_fkey FOREIGN KEY (state_id) REFERENCES public.states(id);
 I   ALTER TABLE ONLY public.projects DROP CONSTRAINT projects_state_id_fkey;
       public          ProjectTrack    false    224    4763    227            �           2606    157462    tasks tasks_assignment_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES public.assignments(id);
 H   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_assignment_id_fkey;
       public          ProjectTrack    false    235    4771    233            �           2606    157452    tasks tasks_participant_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_participant_id_fkey FOREIGN KEY (participant_id) REFERENCES public.participants(id);
 I   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_participant_id_fkey;
       public          ProjectTrack    false    4767    229    235            �           2606    157447    tasks tasks_project_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id);
 E   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_project_id_fkey;
       public          ProjectTrack    false    227    4765    235            �           2606    157457    tasks tasks_state_id_fkey    FK CONSTRAINT     z   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_state_id_fkey FOREIGN KEY (state_id) REFERENCES public.states(id);
 C   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_state_id_fkey;
       public          ProjectTrack    false    224    4763    235            S     x����j!��>�lPg���J�P赗i���UQ[(!�^wC�=�����g����2�R�� ��i@	PP J@���p8j@������X�(��e�`�)L�f�1s�x���c���y*��aN�Ֆe�'W�e����l�CvTSB�0��\����b�q�؋��m��e9M������3՘�a��Dyzw��~I��u3���h[��u*SZā�VUj�r3�47�Kj�U�X��'���@��|���/}��      H   �   x�}�;n!@��"俁6�H��m ��?�a$3ՕC����y}��#����̖y���q�?W���H���D4�
�^A�<R]T]kj��M.��ӘS����Yb'j,����u���;S�o�E̒�+D2��:Q�3Bw���+��?Ú�G8��p�0�T�؉b�}����
�i�%9$sd.�����5;ی��U I�鎦�B�kk����&��/      D   7  x�}�An� E�p
.�1�q�ͮRԪjw�L�i�4��Ez��z�\�CQ�ؕ@B�Fz��i��-��>t�^�#����=Dq���C�L-�щC�� =4�w�1�͈��D�0�a���L+m�^(+�^�j�Y���B��S�Y���a3<h�o�n�؀h���H��rL�������	d�������L�MyN�����C�2��Oz�ӷ#�8�OFKIU�\���?�����/7��y�6Ҫ�,�I�5�3��G�T%0o�+�ikSi�rMy�
��w��3������ &=ה�J���.�      O   �   x����ACco4�����R� !�ي� �Zz�g��������`bQeU�7�g��v�G���-���m�'la;��fK�d�҇*�hgE�p�6Z�SAϦ,��~ଭ�e4��2W~AX�G)�%�s      Q     x����N�0��u�}�"'m����쐐IG�!79������HwuVH8�W��irgI;�x����������V/���.��Q[����$SY�R��*�js�7��ʊ\��+��|�Ȓg�{ɪ���:y������ue~��˓{�H&�2�i��u��h���Lۈ[�@9<@{3�� �I��6��@��?@2_� ���B�'�~Q��ޝm�3��,USk3c�4$��Y]������Q��:}����]u�t���D�SP{B��S��&T݄���-��gS[gJ������{v�'0�S��I��;����g��3�S�O��Ӑ���H|�� a��I�ƴ8��'���ā�:	 ��q�8MP[���W�oLQrO�ȫRԜ&R�)*�F��rt;�����W�V�����_�����ug��:�KQ�#�m^�^u�-&vz�����$PcV�ī�`�RE^���=^�^�v�L�ރ���"	�!-^�$mVh��H&���W���w���      M   5  x�͒�n� ���)x�6����TݩR�N;��ֱ���Է���6�i�&$d>��s����`do��Ә7�;��z-���-h�<{��?��m�Au���T��Ki[V�"	+��Zd�l�3��W�|�̅(U�ߧIA�9;��T2� �/��D&�����B��N����J��q�N�$��$Ē�=zz���M���B;����pu.���*v���m�Asw�"P�< ڡc|�s
��홚~}��Es��X\�z�y'�2�Xtg�ec�;�WCO��^+���h��o�6�}a����m�$�n�      F   ;  x���Aj�0E��)t�� i�ήt�t��C8Wr
iɩz�^��H��nҍ4bf���e��kT�a4���0S��`J�5LS�jXka	���Ad@D����5��(�9{j���>���T#�8|�����1U�N�9�^zT甄����k��g�N������I��s`7rf�-�^�Jiڬh��ee+���.��v�n�s��ÎC����^���t��#����o9�E�����ϭ��j��~�|���Gj[i9�Qµ�R��\p�2��?]�7��	A�/3���K8w�R��b�����(���_�y�Woҹ      J     x��R;n�0��S�	\Ǳ�nA��A�.�̢,�1$9hs���G��Jp��b@ߣ�{$ԁ\�����>�/�Ƀ���(��7�#:v�٫���T�U�(���IުY�e��J3	����'?�K��b+�wp�!�ŤwR#����^�r�v��١�����;Bd�����R�1q|Caƙ|���&s���n�F��J��4��ԂE�ϔ�U/t�ȗ7��#~x#Q@9=�b�ɣtQ_����FmS�81�����z�g�M��e#�ˢ(~��      U   �   x����
�0�s�y��v�����'�ŋ�L�:7���7CQv��a$%��GS�:���}�����Ɲ�T�Fȍ�H[f�46�6�
%����F����O��zۡ�څ��~ҕ�����$�cD�ap_�Gh(�35�>��5L����U���EOs4S���kK�	��	=�6      B   �   x�}�AN�0E��Sp�X���^U�CBBEb�f�V1�m�VH�N=E/FP�B����O3
�}z�x�'x�:��yB�5,^�6r��K�P+��pS<o=(T�B[aw��C�L+-�m�
��� X��w�����9r�2ǾXͤ��fĭӝD�:l.�ϩ�p�7�Í�N�'����qZgH�����9��{�#OyH'��a�g~[�#-�խ�u��x�B�/�V}�     