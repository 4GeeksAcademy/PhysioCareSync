"""empty message

Revision ID: 5ce61e05d123
Revises: abe5a08f28b8
Create Date: 2023-12-20 16:32:13.611249

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5ce61e05d123'
down_revision = 'abe5a08f28b8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('specialist', schema=None) as batch_op:
        batch_op.alter_column('certificate',
               existing_type=sa.VARCHAR(length=120),
               type_=sa.String(length=250),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('specialist', schema=None) as batch_op:
        batch_op.alter_column('certificate',
               existing_type=sa.String(length=250),
               type_=sa.VARCHAR(length=120),
               existing_nullable=True)

    # ### end Alembic commands ###
